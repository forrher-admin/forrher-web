import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/PageShell";
import { SoftPanel } from "@/components/ui/SoftPanel";
import { getShopProduct, shopProducts } from "@/content/shop/products";

export const instant = false;

export function generateStaticParams() {
  return shopProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getShopProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ShopProductPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getShopProduct(slug);
  if (!product) notFound();

  return (
    <div>
      <section className="border-b border-border bg-cream">
        <PageShell className="py-10 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
                {product.tagline}
              </p>
              <h1 className="mt-3 font-heading text-4xl text-mocha sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted">
                {product.summary}
              </p>
              <p className="mt-5 font-heading text-2xl text-mocha">
                {product.promise}
              </p>
            </div>

            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-mocha p-2 shadow-[0_28px_60px_rgba(61,36,32,0.16)] sm:p-3">
              <div className="relative h-full overflow-hidden rounded-[1.25rem] bg-cream-deep">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <PageShell className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-10">
            {product.gallery.length > 1 ? (
              <section>
                <h2 className="font-heading text-2xl text-mocha">Look closer</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {product.gallery.map((item) => (
                    <li
                      key={item.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section>
              <h2 className="font-heading text-2xl text-mocha">Why it helps</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-2xl border border-border bg-cream/50 px-4 py-4 text-base text-text"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>

            {product.howItWorks ? (
              <section>
                <h2 className="font-heading text-2xl text-mocha">How it works</h2>
                <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.howItWorks.map((item, index) => (
                    <li
                      key={item.step}
                      className="rounded-2xl border border-border bg-surface p-5"
                    >
                      <p className="text-sm font-medium text-gold">
                        0{index + 1}
                      </p>
                      <p className="mt-2 font-heading text-xl text-mocha">
                        {item.step}
                      </p>
                      <p className="mt-2 text-base text-muted">{item.body}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {product.compartments ? (
              <section>
                <h2 className="font-heading text-2xl text-mocha">
                  What it holds
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted">
                  Thoughtful pockets for period essentials and everyday comfort —
                  ready when you are.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.compartments.map((item) => (
                    <li
                      key={item.label}
                      className="border-t border-border pt-4"
                    >
                      <p className="font-medium text-text">{item.label}</p>
                      <p className="mt-1 text-base text-muted">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {product.colors ? (
              <section>
                <h2 className="font-heading text-2xl text-mocha">
                  Available colors
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  {product.colors.map((color) => (
                    <li
                      key={color.name}
                      className="rounded-2xl border border-border bg-surface p-4"
                    >
                      <span
                        className="mb-3 block h-10 w-10 rounded-full border border-border"
                        style={{ backgroundColor: color.swatch }}
                        aria-hidden="true"
                      />
                      <p className="font-medium text-text">{color.name}</p>
                      <p className="mt-1 text-sm text-muted">{color.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <SoftPanel className="bg-mocha text-on-primary">
              <p className="font-heading text-2xl">{product.promise}</p>
              <p className="mt-3 text-base text-cream/85">{product.priceLabel}</p>
              {product.paymentLink ? (
                <a
                  href={product.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forrher-press mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-5 text-base text-mocha"
                >
                  Buy with Paystack
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-xl bg-cream/20 px-5 text-base text-on-primary"
                >
                  Checkout coming soon
                </button>
              )}
              <p className="mt-3 text-sm text-cream/75">
                Live M-Pesa and card payment links will be added with Paystack.
              </p>
            </SoftPanel>

            <SoftPanel>
              <h2 className="font-heading text-xl text-mocha">Details</h2>
              <ul className="mt-3 space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="text-base text-muted">
                    {detail}
                  </li>
                ))}
              </ul>
            </SoftPanel>

            <SoftPanel className="bg-cream/70">
              <h2 className="font-heading text-xl text-mocha">Perfect for</h2>
              <p className="mt-3 text-base text-muted">
                {product.perfectFor.join(" · ")}
              </p>
            </SoftPanel>
          </aside>
        </div>

        <p className="mt-12">
          <Link
            href="/shop"
            className="text-base text-muted underline underline-offset-4 hover:text-mocha"
          >
            Back to shop
          </Link>
        </p>
      </PageShell>
    </div>
  );
}
