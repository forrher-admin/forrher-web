import Image from "next/image";
import Link from "next/link";
import { AskForrHerSearch } from "@/components/AskForrHerSearch";
import { FeatureCards } from "@/components/FeatureCards";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SituationChips } from "@/components/SituationChips";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shopProducts } from "@/content/shop/products";

export default function HomePage() {
  const [first, second] = shopProducts;

  return (
    <div>
      <section className="overflow-hidden border-b border-border bg-cream">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div className="relative z-10 max-w-xl">
            <p className="forrher-fade-up font-heading text-5xl leading-[0.95] text-mocha sm:text-6xl lg:text-[4.5rem]">
              ForrHer
            </p>
            <p className="forrher-fade-up-delay mt-3 text-sm font-medium tracking-[0.18em] text-gold uppercase">
              Discreet · Dignified · Yours
            </p>
            <h1 className="forrher-fade-up-delay mt-6 font-heading text-[1.85rem] leading-snug text-text sm:text-3xl">
              What would make today easier?
            </h1>
            <p className="forrher-fade-up-delay-2 mt-3 max-w-md text-base text-muted sm:text-lg">
              Calm guidance for the day you are having — practical support, no
              jargon, no pressure.
            </p>

            <div className="forrher-fade-up-delay-2 mt-6 space-y-3">
              <h2 className="sr-only">Choose a situation</h2>
              <SituationChips />
              <AskForrHerSearch />
            </div>
          </div>

          <div className="forrher-fade-up-delay w-full lg:pt-1">
            <Link
              href="/shop"
              className="forrher-press group block rounded-[1.5rem] bg-mocha p-2.5 shadow-[0_24px_50px_rgba(61,36,32,0.16)] sm:p-3"
            >
              <div className="relative aspect-[5/6] overflow-hidden rounded-[1.1rem] bg-cream-deep sm:aspect-[4/5]">
                <Image
                  src={
                    first?.image ?? "/shop/period-private-pouch-hero.jpg"
                  }
                  alt={first?.imageAlt ?? "ForrHer shop"}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 92vw, 40vw"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-2.5 py-3.5 text-on-primary">
                <div>
                  <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
                    Shop
                  </p>
                  <p className="mt-0.5 font-heading text-xl">
                    Self-care, ready to carry
                  </p>
                </div>
                <span className="text-base underline underline-offset-4">
                  Explore
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Shop"
                title="Starter products"
                description="Two pieces made to feel calm in the hand — and easy to explain to someone you care about."
              />
              <Link
                href="/shop"
                className="inline-flex min-h-11 items-center text-base text-mocha underline underline-offset-4"
              >
                View shop
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 space-y-8">
            {first ? (
              <Reveal>
                <Link
                  href={`/shop/${first.slug}`}
                  className="forrher-press group grid overflow-hidden rounded-[1.5rem] border border-border bg-surface lg:grid-cols-[1.05fr_0.95fr]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-cream lg:aspect-auto lg:min-h-[26rem]">
                    <Image
                      src={first.image}
                      alt={first.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
                      {first.tagline}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl text-mocha sm:text-4xl">
                      {first.name}
                    </h3>
                    <p className="mt-4 text-base text-muted sm:text-lg">
                      {first.summary}
                    </p>
                    <p className="mt-5 font-heading text-xl text-mocha">
                      {first.promise}
                    </p>
                    <span className="mt-6 inline-flex min-h-11 items-center text-base text-mocha underline underline-offset-4">
                      View product
                    </span>
                  </div>
                </Link>
              </Reveal>
            ) : null}

            {second ? (
              <Reveal>
                <Link
                  href={`/shop/${second.slug}`}
                  className="forrher-press group grid overflow-hidden rounded-[1.5rem] border border-border bg-cream/60 lg:grid-cols-[0.95fr_1.05fr]"
                >
                  <div className="order-2 flex flex-col justify-center p-6 sm:p-8 lg:order-1 lg:p-10">
                    <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
                      {second.tagline}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl text-mocha sm:text-4xl">
                      {second.name}
                    </h3>
                    <p className="mt-4 text-base text-muted sm:text-lg">
                      {second.summary}
                    </p>
                    <p className="mt-5 font-heading text-xl text-mocha">
                      {second.promise}
                    </p>
                    <span className="mt-6 inline-flex min-h-11 items-center text-base text-mocha underline underline-offset-4">
                      View product
                    </span>
                  </div>
                  <div className="relative order-1 aspect-[4/5] overflow-hidden bg-cream-deep lg:order-2 lg:aspect-auto lg:min-h-[26rem]">
                    <Image
                      src={second.image}
                      alt={second.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </Link>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Explore"
              title="Everything in one calm place"
              description="Learn, plan, find what you need, or reach out about Spaces."
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <FeatureCards />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal>
          <ProfessionalNote />
        </Reveal>
      </section>
    </div>
  );
}
