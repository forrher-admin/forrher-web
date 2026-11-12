import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/content/shop/products";

type ProductCardProps = {
  product: ShopProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-[0_18px_40px_rgba(74,44,42,0.08)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="space-y-2 p-5">
        <p className="text-sm tracking-[0.14em] text-gold uppercase">
          {product.tagline}
        </p>
        <h2 className="font-heading text-2xl text-mocha">{product.name}</h2>
        <p className="text-base text-muted">{product.summary}</p>
        <p className="pt-2 text-base text-primary underline underline-offset-2">
          View product
        </p>
      </div>
    </Link>
  );
}
