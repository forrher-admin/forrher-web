import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/content/shop/products";

type ProductCardProps = {
  product: ShopProduct;
  cropClass?: string;
};

export function ProductCard({
  product,
  cropClass = "product-crop-organizer",
}: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="forrher-press group block overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cropClass}
        />
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
          {product.tagline}
        </p>
        <h2 className="font-heading text-2xl text-mocha">{product.name}</h2>
        <p className="text-base text-muted">{product.summary}</p>
        <p className="pt-1 text-base text-mocha underline underline-offset-4">
          View product
        </p>
      </div>
    </Link>
  );
}
