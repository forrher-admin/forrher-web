import Link from "next/link";
import { Logo } from "@/components/Logo";

const footerLinks = [
  { href: "/today", label: "Today" },
  { href: "/learn", label: "Learn" },
  { href: "/tools", label: "Tools" },
  { href: "/shop", label: "Shop" },
  { href: "/spaces", label: "Spaces" },
  { href: "/account", label: "Account" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-3 text-sm font-medium tracking-[0.14em] text-gold uppercase">
              Discreet · Dignified · Yours
            </p>
            <p className="mt-4 text-base text-muted">
              Calm, practical support for everyday women&apos;s health questions.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-muted transition-colors hover:text-mocha"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-sm text-muted">
          ForrHer shares general information and is not a substitute for
          professional medical advice.{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-mocha"
          >
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
