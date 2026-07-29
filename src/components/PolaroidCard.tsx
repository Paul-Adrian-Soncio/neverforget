"use client";

import { useEffect, useState } from "react";
import { DEVELOPING_FILTER, getFilterById } from "@/lib/filters";
import { tiltForId } from "@/lib/tilt";

interface PolaroidCardProps {
  id?: string;
  imageDataUrl: string;
  filterId: string;
  title?: string;
  date?: string;
  onClick?: () => void;
  className?: string;
  developing?: boolean;
}

export default function PolaroidCard({
  id,
  imageDataUrl,
  filterId,
  title,
  date,
  onClick,
  className = "",
  developing = false,
}: PolaroidCardProps) {
  const filter = getFilterById(filterId);
  const [isDeveloped, setIsDeveloped] = useState(!developing);

  useEffect(() => {
    if (!developing) return;
    const timer = setTimeout(() => setIsDeveloped(true), 300);
    return () => clearTimeout(timer);
  }, [developing]);

  const autoTilt = id && !className.includes("rotate") ? tiltForId(id) : null;
  const tiltStyle = autoTilt !== null ? { transform: `rotate(${autoTilt}deg)` } : undefined;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      style={tiltStyle}
      className={`group bg-paper shadow-[0_10px_25px_-8px_var(--paper-shadow)] rounded-[2px] p-3 pb-5 w-full max-w-[280px] text-left transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-black/10">
        {imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt={title || "Polaroid photo"}
            className="h-full w-full object-cover transition-all ease-out"
            style={{
              filter: isDeveloped ? filter.css : DEVELOPING_FILTER,
              transitionDuration: developing ? "2800ms" : "0ms",
            }}
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" />
        )}
      </div>
      <div className="mt-3 min-h-[2.5rem] px-1 text-center">
        {title && (
          <p className="truncate font-handwritten text-2xl leading-tight text-neutral-800">
            {title}
          </p>
        )}
        {date && (
          <p className="font-handwritten text-lg leading-tight text-neutral-500">
            {date}
          </p>
        )}
      </div>
    </div>
  );
}
