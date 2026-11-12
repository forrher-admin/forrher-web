import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-heading text-2xl tracking-tight text-primary transition-opacity hover:opacity-80 ${className}`}
      aria-label="ForrHer home"
    >
      ForrHer
    </Link>
  );
}
