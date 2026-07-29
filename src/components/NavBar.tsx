import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex w-full items-center justify-between border-b border-border-warm px-6 py-3">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="NeverForget logo"
          width={32}
          height={32}
          className="rounded-sm"
          priority
        />
        <span className="font-handwritten text-2xl leading-none text-foreground">
          NeverForget
        </span>
      </Link>
      <nav className="flex items-center gap-6 font-serif text-sm text-muted">
        <Link href="/gallery" className="transition-colors hover:text-accent">
          Gallery
        </Link>
        <Link
          href="/create"
          className="rounded-sm border border-border-warm px-3 py-1.5 text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          + Add a photo
        </Link>
      </nav>
    </header>
  );
}
