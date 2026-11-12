import { ProductCard } from "@/components/shop/ProductCard";
import { shopProducts } from "@/content/shop/products";

export const metadata = {
  title: "Shop",
  description:
    "Thoughtful ForrHer products for privacy, readiness, and everyday dignity.",
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm tracking-[0.16em] text-gold uppercase">
        ForrHer Shop
      </p>
      <h1 className="mt-2 font-heading text-4xl text-text sm:text-5xl">
        Discreet essentials
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Starter products made for privacy and everyday readiness. Payment links
        will connect once Paystack checkout is ready.
      </p>

      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {shopProducts.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
