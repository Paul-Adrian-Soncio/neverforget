interface PolaroidBackProps {
  note?: string;
  date?: string;
  onClick?: () => void;
  className?: string;
}

export default function PolaroidBack({
  note,
  date,
  onClick,
  className = "",
}: PolaroidBackProps) {
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
      className={`flex w-full max-w-[280px] aspect-[280/336] flex-col bg-paper shadow-[0_10px_25px_-8px_var(--paper-shadow)] p-6 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {date && (
        <p className="font-handwritten text-lg text-neutral-500">{date}</p>
      )}
      <p className="mt-3 flex-1 whitespace-pre-wrap font-handwritten text-2xl leading-snug text-neutral-800">
        {note || "No notes added for this memory."}
      </p>
    </div>
  );
}
