import Link from "next/link";
import CreatePolaroidFlow from "@/components/CreatePolaroidFlow";

export default function CreatePage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/gallery"
          className="font-serif text-sm text-muted hover:text-foreground"
        >
          ← Back to gallery
        </Link>
        <h1 className="font-handwritten text-3xl text-foreground">
          New memory
        </h1>
      </div>
      <CreatePolaroidFlow />
    </main>
  );
}
