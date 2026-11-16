import Link from "next/link";

const base =
  "forrher-press inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-base text-on-primary hover:bg-primary-hover disabled:opacity-50";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

export function PrimaryButton({
  children,
  className = "",
  ...props
}: CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function PrimaryLink({
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
