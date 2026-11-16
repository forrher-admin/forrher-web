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
      className="forrher-press group block overflow-hidden rounded-[1.5rem] border border-border bg-surface"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mocha/70 via-mocha/15 to-transparent p-5 pt-16">
          <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
            {product.tagline}
          </p>
          <h2 className="mt-1 font-heading text-2xl text-on-primary sm:text-3xl">
            {product.name}
          </h2>
        </div>
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <p className="text-base text-muted">{product.summary}</p>
        <p className="font-heading text-lg text-mocha">{product.promise}</p>
        <span className="inline-flex min-h-11 items-center text-base text-mocha underline underline-offset-4">
          View product
        </span>
      </div>
    </Link>
  );
}
