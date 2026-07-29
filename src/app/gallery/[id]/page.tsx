"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PolaroidCard from "@/components/PolaroidCard";
import PolaroidBack from "@/components/PolaroidBack";
import { usePolaroids } from "@/lib/polaroid-context";

export default function PolaroidFocusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { polaroids, loaded, removePolaroid } = usePolaroids();
  const router = useRouter();
  const polaroid = polaroids.find((p) => p.id === id);

  if (loaded && !polaroid) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-serif text-sm text-muted">
          This memory couldn&apos;t be found.
        </p>
        <Link
          href="/gallery"
          className="rounded-sm border border-border-warm px-4 py-2 font-serif text-sm text-foreground hover:border-accent hover:text-accent"
        >
          Back to gallery
        </Link>
      </main>
    );
  }

  if (!polaroid) return null;

  const handleDelete = () => {
    removePolaroid(polaroid.id);
    router.push("/gallery");
  };

  return (
    <main className="flex flex-1 flex-col items-center gap-10 px-4 py-12">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/gallery"
          className="font-serif text-sm text-muted hover:text-foreground"
        >
          ← Back to gallery
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="font-serif text-sm text-muted hover:text-accent"
        >
          Remove
        </button>
      </div>

      <div className="flex w-full max-w-3xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center">
        <PolaroidCard
          imageDataUrl={polaroid.imageDataUrl}
          filterId={polaroid.filterId}
          title={polaroid.title}
          date={polaroid.date}
          className="-rotate-2 hover:rotate-0"
        />
        <PolaroidBack
          note={polaroid.note}
          date={polaroid.date}
          className="rotate-2 hover:rotate-0"
        />
      </div>
    </main>
  );
}
