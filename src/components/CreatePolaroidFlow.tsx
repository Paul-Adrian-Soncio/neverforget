"use client";

import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { useRouter } from "next/navigation";
import { getCroppedImage } from "@/lib/crop-image";
import { FILTER_PRESETS, getFilterById, getRandomFilter } from "@/lib/filters";
import { usePolaroids } from "@/lib/polaroid-context";
import PolaroidCard from "@/components/PolaroidCard";

type Step = "upload" | "crop" | "filter" | "details";

export default function CreatePolaroidFlow() {
  const router = useRouter();
  const { addPolaroid } = usePolaroids();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("upload");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [filterId, setFilterId] = useState<string>("original");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setStep("crop");
    };
    reader.readAsDataURL(file);
  }, []);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const confirmCrop = useCallback(async () => {
    if (!rawImage || !croppedAreaPixels) return;
    const result = await getCroppedImage(rawImage, croppedAreaPixels);
    setCroppedImage(result);
    setFilterId("original");
    setStep("filter");
  }, [rawImage, croppedAreaPixels]);

  const shuffleFilter = useCallback(() => {
    setFilterId((current) => getRandomFilter(current).id);
  }, []);

  const handleSave = useCallback(() => {
    if (!croppedImage) return;
    setSaving(true);
    const created = addPolaroid({
      imageDataUrl: croppedImage,
      filterId,
      title: title.trim(),
      date,
      note: note.trim(),
    });
    window.sessionStorage.setItem("neverforget:developing", created.id);
    router.push("/gallery");
  }, [croppedImage, filterId, title, date, note, addPolaroid, router]);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-8 px-4 py-10">
      {step === "upload" && (
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-sm font-serif text-sm text-muted">
            Pick a photo to turn into a keepsake. You&apos;ll crop it, choose a
            look, and add a memory to go with it.
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-sm border border-border-warm bg-background-elevated px-6 py-3 font-serif text-sm tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Choose a photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {step === "crop" && rawImage && (
        <div className="flex w-full max-w-md flex-col items-center gap-5">
          <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-sm bg-black">
            <Cropper
              image={rawImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full max-w-[320px] accent-accent"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("upload")}
              className="rounded-sm border border-border-warm px-5 py-2 font-serif text-sm text-muted hover:text-foreground"
            >
              Back
            </button>
            <button
              type="button"
              onClick={confirmCrop}
              className="rounded-sm bg-accent px-5 py-2 font-serif text-sm text-background transition-colors hover:bg-accent-soft"
            >
              Use this crop
            </button>
          </div>
        </div>
      )}

      {step === "filter" && croppedImage && (
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <PolaroidCard imageDataUrl={croppedImage} filterId={filterId} />
          <p className="font-serif text-xs uppercase tracking-widest text-muted">
            {getFilterById(filterId).name}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={shuffleFilter}
              className="rounded-sm border border-border-warm px-5 py-2 font-serif text-sm text-foreground hover:border-accent hover:text-accent"
            >
              Try another look
            </button>
            <button
              type="button"
              onClick={() => setStep("details")}
              className="rounded-sm bg-accent px-5 py-2 font-serif text-sm text-background transition-colors hover:bg-accent-soft"
            >
              Keep this one
            </button>
          </div>
        </div>
      )}

      {step === "details" && croppedImage && (
        <div className="flex w-full max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
          <PolaroidCard
            imageDataUrl={croppedImage}
            filterId={filterId}
            title={title}
            date={date}
          />
          <div className="flex w-full max-w-sm flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="font-serif text-xs uppercase tracking-widest text-muted">
                Title
              </span>
              <input
                type="text"
                value={title}
                maxLength={40}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A little caption"
                className="rounded-sm border border-border-warm bg-background-elevated px-3 py-2 font-handwritten text-xl text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-serif text-xs uppercase tracking-widest text-muted">
                Date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-sm border border-border-warm bg-background-elevated px-3 py-2 font-serif text-sm text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-serif text-xs uppercase tracking-widest text-muted">
                Notes (on the back)
              </span>
              <textarea
                value={note}
                maxLength={280}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                placeholder="What made this moment worth keeping?"
                className="resize-none rounded-sm border border-border-warm bg-background-elevated px-3 py-2 font-handwritten text-xl leading-snug text-foreground outline-none focus:border-accent"
              />
            </label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("filter")}
                className="rounded-sm border border-border-warm px-5 py-2 font-serif text-sm text-muted hover:text-foreground"
              >
                Back
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="rounded-sm bg-accent px-5 py-2 font-serif text-sm text-background transition-colors hover:bg-accent-soft disabled:opacity-60"
              >
                Save to gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
