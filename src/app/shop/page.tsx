import { ProductCard } from "@/components/shop/ProductCard";
import { PageShell } from "@/components/ui/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shopProducts } from "@/content/shop/products";

export const metadata = {
  title: "Shop",
  description:
    "Thoughtful ForrHer products for privacy, readiness, and everyday dignity.",
};

export default function ShopPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Shop"
        title="Discreet essentials"
        description="Starter products made for privacy and everyday readiness. Payment links will connect once Paystack checkout is ready."
      />

      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {shopProducts.map((product) => (
          <li key={product.slug}>
            <ProductCard
              product={product}
              cropClass={
                product.slug.includes("pouch")
                  ? "product-crop-pouch"
                  : "product-crop-organizer"
              }
            />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
