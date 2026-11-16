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
      <section className="relative overflow-hidden border-b border-border bg-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-mocha lg:block"
        />

        <div className="relative mx-auto grid max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <p className="forrher-fade-up font-heading text-5xl text-mocha sm:text-6xl lg:text-7xl">
              ForrHer
            </p>
            <p className="forrher-fade-up-delay mt-3 text-sm font-medium tracking-[0.16em] text-gold uppercase">
              Discreet · Dignified · Yours
            </p>
            <h1 className="forrher-fade-up-delay mt-8 max-w-xl font-heading text-3xl text-text sm:text-4xl">
              What would make today easier?
            </h1>
            <p className="forrher-fade-up-delay-2 mt-4 max-w-md text-lg text-muted">
              Calm guidance for the day you are having — practical support, no
              jargon, no pressure.
            </p>

            <div className="forrher-fade-up-delay-2 mt-8">
              <h2 className="sr-only">Choose a situation</h2>
              <SituationChips />
            </div>

            <div className="forrher-fade-up-delay-2 mt-5 max-w-xl">
              <AskForrHerSearch />
            </div>
          </div>

          <div className="relative min-h-[22rem] bg-mocha lg:min-h-full">
            <Image
              src="/shop/period-everyday-organizer.jpg"
              alt="ForrHer Period and Everyday Organizer"
              fill
              priority
              className="product-crop-organizer opacity-90"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mocha via-mocha/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-on-primary sm:p-8">
              <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
                Shop
              </p>
              <p className="mt-2 font-heading text-2xl sm:text-3xl">
                Self-care, beautifully together
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-flex min-h-11 items-center text-base underline underline-offset-4"
              >
                Explore products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
                  <div className="relative min-h-52 overflow-hidden bg-cream-deep sm:min-h-full">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className={
                        index === 0
                          ? "product-crop-pouch transition-transform duration-500 group-hover:scale-[1.03]"
                          : "product-crop-organizer transition-transform duration-500 group-hover:scale-[1.03]"
                      }
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
                      {product.tagline}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl text-mocha">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-base text-muted">{product.summary}</p>
                    <span className="mt-5 text-base text-mocha underline underline-offset-4">
                      View product
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-cream/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
