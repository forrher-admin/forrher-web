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
  const featured = shopProducts.slice(0, 2);

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
                  src="/shop/period-everyday-organizer-product.jpg"
                  alt="ForrHer Period and Everyday Organizer"
                  fill
                  priority
                  className="product-crop-hero"
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
                description="Two thoughtful pieces for privacy, readiness, and everyday dignity."
              />
              <Link
                href="/shop"
                className="inline-flex min-h-11 items-center text-base text-mocha underline underline-offset-4"
              >
                View shop
              </Link>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {featured.map((product, index) => (
              <li key={product.slug}>
                <Reveal>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="forrher-press group grid overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-[0.85fr_1.15fr]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep sm:aspect-auto sm:min-h-60">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className={
                          index === 0
                            ? "product-crop-pouch"
                            : "product-crop-organizer"
                        }
                        sizes="(max-width: 768px) 100vw, 28vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-5 sm:p-6">
                      <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
                        {product.tagline}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl text-mocha">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-base text-muted">
                        {product.summary}
                      </p>
                      <span className="mt-5 text-base text-mocha underline underline-offset-4">
                        View product
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
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
