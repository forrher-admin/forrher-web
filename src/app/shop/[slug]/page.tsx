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

  const cropClass = slug.includes("pouch")
    ? "product-crop-pouch"
    : "product-crop-organizer";

  return (
    <PageShell>
      <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
        {product.tagline}
      </p>
      <h1 className="mt-3 font-heading text-4xl text-mocha sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{product.summary}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-cream-deep">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            className={cropClass}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6 lg:sticky lg:top-28">
          <SoftPanel>
            <h2 className="font-heading text-2xl text-text">Key benefits</h2>
            <ul className="mt-4 space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="text-base text-muted">
                  {benefit}
                </li>
              ))}
            </ul>
          </SoftPanel>

          <SoftPanel>
            <h2 className="font-heading text-2xl text-text">Details</h2>
            <ul className="mt-4 space-y-2">
              {product.details.map((detail) => (
                <li key={detail} className="text-base text-muted">
                  {detail}
                </li>
              ))}
            </ul>
          </SoftPanel>

          {product.colors ? (
            <SoftPanel>
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
            </SoftPanel>
          ) : null}

          {product.howItWorks ? (
            <SoftPanel>
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
            </SoftPanel>
          ) : null}

          <SoftPanel className="bg-mocha text-on-primary">
            <p className="text-base text-cream">{product.priceLabel}</p>
            {product.paymentLink ? (
              <a
                href={product.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="forrher-press mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-5 text-base text-mocha"
              >
                Buy with Paystack
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-4 inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-xl bg-cream/20 px-5 text-base text-on-primary"
              >
                Checkout coming soon
              </button>
            )}
            <p className="mt-3 text-sm text-cream/80">
              Live M-Pesa and card payment links will be added with Paystack.
            </p>
          </SoftPanel>

          <p className="text-base text-muted">
            Perfect for: {product.perfectFor.join(" · ")}
          </p>
        </div>
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
  );
}
