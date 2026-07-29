"use client";

import { useState } from "react";
import PolaroidCard from "@/components/PolaroidCard";
import PolaroidBack from "@/components/PolaroidBack";

interface PolaroidFlipCardProps {
  imageDataUrl: string;
  filterId: string;
  title?: string;
  date?: string;
  note?: string;
}

export default function PolaroidFlipCard({
  imageDataUrl,
  filterId,
  title,
  date,
  note,
}: PolaroidFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-full max-w-[280px]"
        style={{ perspective: "1600px" }}
      >
        <div
          className="relative w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div style={{ backfaceVisibility: "hidden" }}>
            <PolaroidCard
              imageDataUrl={imageDataUrl}
              filterId={filterId}
              title={title}
              date={date}
              onClick={() => setFlipped(true)}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <PolaroidBack
              note={note}
              date={date}
              onClick={() => setFlipped(false)}
              className="h-full"
            />
          </div>
        </div>
      </div>
      <p className="font-serif text-xs uppercase tracking-widest text-muted">
        {flipped ? "Tap to see the front" : "Tap to see the back"}
      </p>
    </div>
  );
}
