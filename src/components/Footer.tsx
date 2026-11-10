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
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-3 text-base text-muted">
              Calm, practical support for everyday women&apos;s health questions.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-sm text-muted">
          ForrHer shares general information and is not a substitute for
          professional medical advice.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
