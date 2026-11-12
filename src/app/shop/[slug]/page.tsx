import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm tracking-[0.16em] text-gold uppercase">
        {product.tagline}
      </p>
      <h1 className="mt-3 font-heading text-4xl text-mocha sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{product.summary}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-cream">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-2xl text-text">Key benefits</h2>
            <ul className="mt-4 space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="text-base text-muted">
                  {benefit}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text">Details</h2>
            <ul className="mt-4 space-y-2">
              {product.details.map((detail) => (
                <li key={detail} className="text-base text-muted">
                  {detail}
                </li>
              ))}
            </ul>
          </section>

          {product.colors ? (
            <section>
              <h2 className="font-heading text-2xl text-text">Colors</h2>
              <ul className="mt-4 space-y-3">
                {product.colors.map((color) => (
                  <li key={color.name} className="text-base text-muted">
                    <span className="font-medium text-text">{color.name}</span>
                    {" — "}
                    {color.note}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {product.howItWorks ? (
            <section>
              <h2 className="font-heading text-2xl text-text">How it works</h2>
              <ol className="mt-4 space-y-3">
                {product.howItWorks.map((item, index) => (
                  <li key={item.step} className="text-base text-muted">
                    <span className="font-medium text-text">
                      {index + 1}. {item.step}
                    </span>
                    {" — "}
                    {item.body}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section>
            <h2 className="font-heading text-2xl text-text">Perfect for</h2>
            <p className="mt-3 text-base text-muted">
              {product.perfectFor.join(" · ")}
            </p>
          </section>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-base text-muted">{product.priceLabel}</p>
            {product.paymentLink ? (
              <a
                href={product.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-mocha px-5 text-base text-cream transition-opacity hover:opacity-90"
              >
                Buy with Paystack
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-4 inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-md bg-mocha/70 px-5 text-base text-cream"
              >
                Checkout coming soon
              </button>
            )}
            <p className="mt-3 text-sm text-muted">
              Live M-Pesa and card payment links will be added with Paystack.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12">
        <Link
          href="/shop"
          className="text-base text-muted underline underline-offset-2"
        >
          Back to shop
        </Link>
      </p>
    </article>
  );
}
