"use client";

import Link from "next/link";
import { usePolaroids } from "@/lib/polaroid-context";
import PolaroidCard from "@/components/PolaroidCard";

export default function Home() {
  const { polaroids, loaded } = usePolaroids();
  const recent = polaroids.slice(0, 3);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-handwritten text-6xl text-foreground">
          NeverForget
        </h1>
        <p className="max-w-md font-serif text-sm leading-relaxed text-muted">
          A quiet place to keep the photos worth keeping. Add one at a time,
          and watch the shelf fill up.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href="/create"
            className="rounded-sm bg-accent px-6 py-3 font-serif text-sm text-background transition-colors hover:bg-accent-soft"
          >
            Add a photo
          </Link>
          <Link
            href="/gallery"
            className="rounded-sm border border-border-warm px-6 py-3 font-serif text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            View gallery
          </Link>
        </div>
      </div>

      {loaded && recent.length > 0 && (
        <div className="flex flex-wrap items-start justify-center gap-6">
          {recent.map((polaroid, i) => (
            <PolaroidCard
              key={polaroid.id}
              imageDataUrl={polaroid.imageDataUrl}
              filterId={polaroid.filterId}
              title={polaroid.title}
              date={polaroid.date}
              className={i % 2 === 0 ? "-rotate-3" : "rotate-2"}
            />
          ))}
        </div>
      )}
    </main>
  );
}
