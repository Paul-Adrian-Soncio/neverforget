"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PolaroidCard from "@/components/PolaroidCard";
import { usePolaroids } from "@/lib/polaroid-context";

export default function GalleryPage() {
  const { polaroids, loaded } = usePolaroids();
  const router = useRouter();
  const [developingId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const id = window.sessionStorage.getItem("neverforget:developing");
    if (id) window.sessionStorage.removeItem("neverforget:developing");
    return id;
  });

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-12">
      <div className="flex w-full max-w-5xl items-center justify-between pb-10">
        <h1 className="font-handwritten text-4xl text-foreground">
          Your gallery
        </h1>
        <Link
          href="/create"
          className="rounded-sm border border-border-warm px-4 py-2 font-serif text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          + Add a photo
        </Link>
      </div>

      {loaded && polaroids.length === 0 && (
        <div className="flex flex-1 flex-col items-center gap-4 pt-16 text-center">
          <p className="max-w-sm font-serif text-sm text-muted">
            Nothing here yet. Every gallery starts empty — add your first
            memory to begin.
          </p>
          <Link
            href="/create"
            className="rounded-sm bg-accent px-5 py-2 font-serif text-sm text-background transition-colors hover:bg-accent-soft"
          >
            Add your first photo
          </Link>
        </div>
      )}

      <div className="grid w-full max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {polaroids.map((polaroid) => (
          <PolaroidCard
            key={polaroid.id}
            id={polaroid.id}
            imageDataUrl={polaroid.imageDataUrl}
            filterId={polaroid.filterId}
            title={polaroid.title}
            date={polaroid.date}
            developing={polaroid.id === developingId}
            onClick={() => router.push(`/gallery/${polaroid.id}`)}
          />
        ))}
      </div>
    </main>
  );
}
