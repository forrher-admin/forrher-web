import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { PageShell } from "@/components/ui/PageShell";
import { shopProducts } from "@/content/shop/products";

export const metadata = {
  title: "Shop",
  description:
    "Thoughtful ForrHer products for privacy, readiness, and everyday dignity.",
};

export default function ShopPage() {
  return (
    <div>
      <section className="border-b border-border bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <p className="text-sm font-medium tracking-[0.16em] text-gold uppercase">
              Shop
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl text-mocha sm:text-5xl lg:text-6xl">
              Self-care you can carry
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Two starter pieces designed for privacy, readiness, and everyday
              dignity. Checkout with M-Pesa and cards arrives with Paystack.
            </p>
          </Reveal>
        </div>
      </section>

      <PageShell>
        <ul className="grid gap-8 lg:grid-cols-2">
          {shopProducts.map((product) => (
            <li key={product.slug}>
              <Reveal>
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>
      </PageShell>
    </div>
  );
}
