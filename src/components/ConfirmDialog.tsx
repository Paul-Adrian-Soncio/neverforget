"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Remove",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-sm border border-border-warm bg-background-elevated p-6 shadow-[0_10px_25px_-8px_var(--paper-shadow)]"
      >
        <h2 className="font-handwritten text-2xl text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 font-serif text-sm text-muted">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm border border-border-warm px-4 py-2 font-serif text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-sm bg-accent px-4 py-2 font-serif text-sm text-background transition-colors hover:bg-accent-soft"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
