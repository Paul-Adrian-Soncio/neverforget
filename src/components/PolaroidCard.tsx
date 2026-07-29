import { getFilterById } from "@/lib/filters";

interface PolaroidCardProps {
  imageDataUrl: string;
  filterId: string;
  title?: string;
  date?: string;
  onClick?: () => void;
  className?: string;
}

export default function PolaroidCard({
  imageDataUrl,
  filterId,
  title,
  date,
  onClick,
  className = "",
}: PolaroidCardProps) {
  const filter = getFilterById(filterId);

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
      className={`group bg-paper shadow-[0_10px_25px_-8px_var(--paper-shadow)] rounded-[2px] p-3 pb-5 w-full max-w-[280px] text-left transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-black/10">
        {imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt={title || "Polaroid photo"}
            className="h-full w-full object-cover"
            style={{ filter: filter.css }}
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
