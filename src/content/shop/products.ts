export type ProductColor = {
  name: string;
  note: string;
};

export type ShopProduct = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  perfectFor: string[];
  details: string[];
  colors?: ProductColor[];
  howItWorks?: { step: string; body: string }[];
  /** Paystack payment link — set when Mae provides live links */
  paymentLink?: string;
  priceLabel: string;
};

export const shopProducts: ShopProduct[] = [
  {
    slug: "period-private-pouch",
    name: "Period Private Pouch",
    tagline: "Discreet · Dignified · Yours",
    summary:
      "A sleek, leak-resistant pouch for safe, discreet, and hygienic disposal of used menstrual products — anywhere, anytime.",
    image: "/shop/period-private-pouch.jpg",
    imageAlt: "ForrHer Period Private Pouch product overview",
    benefits: [
      "Leak-resistant moisture-lock material",
      "Secure seal for complete privacy",
      "Discreet design that looks like a regular pouch",
      "Compact and portable for bags or pockets",
      "Durable and reusable for everyday use",
    ],
    perfectFor: ["Home", "Work", "School", "Travel", "Hotels", "Public spaces"],
    details: [
      "Privacy and dignity when you need a moment of care",
      "Helps keep disposal hygienic and contained",
      "Easy to carry with confidence",
    ],
    howItWorks: [
      { step: "Open", body: "Tear the notch or unseal the pouch." },
      {
        step: "Insert",
        body: "Place your used sanitary pad or other menstrual waste inside.",
      },
      { step: "Seal", body: "Press firmly across the seal." },
      {
        step: "Dispose",
        body: "Throw it in a bin or responsible waste system.",
      },
    ],
    priceLabel: "Payment link coming soon",
  },
  {
    slug: "period-everyday-organizer",
    name: "Period & Everyday Organizer",
    tagline: "Prepare · Protect · Empower",
    summary:
      "More than a bag — self-care in a pouch. A calm organizer for period essentials and everyday comfort items.",
    image: "/shop/period-everyday-organizer.jpg",
    imageAlt: "ForrHer Period and Everyday Organizer product overview",
    benefits: [
      "Privacy and dignity",
      "Stay organised",
      "Travel friendly",
      "Comfort and convenience",
      "Multi-purpose for everyday life",
    ],
    perfectFor: ["Home", "Work", "School", "Travel", "Hotels", "Public spaces"],
    details: [
      "Premium water-resistant material",
      "Smooth gold-toned zippers with comfort handle",
      "Thoughtful compartments for pads, liners, wipes, heat pad, and more",
      "Includes space for Luna disposal pouches",
    ],
    colors: [
      { name: "Sage Green", note: "Calm. Fresh. Natural." },
      { name: "Blush Pink", note: "Soft. Feminine. Uplifting." },
      { name: "Mocha Beige", note: "Classic. Versatile. Timeless." },
    ],
    priceLabel: "Payment link coming soon",
  },
];

export function getShopProduct(slug: string) {
  return shopProducts.find((product) => product.slug === slug);
}
