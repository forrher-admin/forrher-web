import Link from "next/link";

const base =
  "forrher-press inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-base text-text hover:border-gold hover:bg-cream";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

export function GhostButton({
  children,
  className = "",
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}
