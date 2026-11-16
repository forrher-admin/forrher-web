import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-heading text-[1.7rem] leading-none tracking-[-0.03em] text-mocha transition-opacity hover:opacity-80 ${className}`}
      aria-label="ForrHer home"
    >
      ForrHer
    </Link>
  );
}
