import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="font-heading text-sm tracking-[0.18em] text-gold uppercase">
        404
      </p>
      <h1 className="mt-3 font-heading text-4xl text-mocha">Page not found</h1>
      <p className="mt-4 text-lg text-muted">
        That page is not here. Let&apos;s get you back to something helpful.
      </p>
      <Link
        href="/"
        className="forrher-press mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-mocha px-5 text-base text-on-primary hover:bg-primary-hover"
      >
        Back to home
      </Link>
    </section>
  );
}
