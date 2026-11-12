import Image from "next/image";
import Link from "next/link";
import { AskForrHerSearch } from "@/components/AskForrHerSearch";
import { FeatureCards } from "@/components/FeatureCards";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SituationChips } from "@/components/SituationChips";
import { shopProducts } from "@/content/shop/products";

export default function HomePage() {
  const featured = shopProducts.slice(0, 2);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#f7ebe4_0%,_transparent_48%),radial-gradient(ellipse_at_bottom_right,_#dce6dd_0%,_transparent_42%),linear-gradient(180deg,_#faf7f5_0%,_#f3e6eb_100%)]"
        />
        <div
          aria-hidden="true"
          className="forrher-grain pointer-events-none absolute inset-0 opacity-70"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="forrher-fade-up font-heading text-5xl text-primary sm:text-6xl lg:text-7xl">
              ForrHer
            </p>
            <p className="forrher-fade-up-delay mt-3 text-sm tracking-[0.22em] text-gold uppercase">
              Discreet · Dignified · Yours
            </p>
            <h1 className="forrher-fade-up-delay mt-8 max-w-2xl font-heading text-3xl text-text sm:text-4xl lg:text-5xl">
              What would make today easier?
            </h1>
            <p className="forrher-fade-up-delay-2 mt-4 max-w-xl text-lg text-muted">
              Calm guidance for the day you are having — practical support, no
              jargon, no pressure.
            </p>
          </div>

          <div className="forrher-fade-up-delay-2 relative hidden min-h-72 overflow-hidden rounded-[1.75rem] border border-border/70 bg-mocha/90 shadow-[0_30px_80px_rgba(74,44,42,0.18)] lg:block">
            <Image
              src="/shop/period-everyday-organizer.jpg"
              alt="ForrHer Period and Everyday Organizer"
              fill
              priority
              className="object-cover opacity-90"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mocha/80 via-mocha/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
              <p className="text-sm tracking-[0.16em] uppercase">Shop</p>
              <p className="mt-2 font-heading text-2xl">
                Self-care, beautifully together
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <h2 className="sr-only">Choose a situation</h2>
          <SituationChips />
          <div className="mt-6 max-w-2xl">
            <AskForrHerSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm tracking-[0.16em] text-gold uppercase">
              ForrHer Shop
            </p>
            <h2 className="mt-2 font-heading text-3xl text-text sm:text-4xl">
              Starter products
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted">
              Two thoughtful pieces for privacy, readiness, and everyday dignity.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center text-base text-primary underline underline-offset-2"
          >
            View shop
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/shop/${product.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="relative min-h-56 bg-cream sm:min-h-full">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <p className="text-sm tracking-[0.14em] text-gold uppercase">
                    {product.tagline}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl text-mocha">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-base text-muted">{product.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-3xl text-text">Explore ForrHer</h2>
          <p className="mt-2 max-w-2xl text-base text-muted">
            Learn, plan, find what you need, or discover a supportive space.
          </p>
          <div className="mt-8">
            <FeatureCards />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ProfessionalNote />
      </section>
    </div>
  );
}
