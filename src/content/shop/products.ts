export type ProductColor = {
  name: string;
  note: string;
  swatch: string;
};

export type ShopProduct = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  promise: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  benefits: string[];
  perfectFor: string[];
  details: string[];
  compartments?: { label: string; body: string }[];
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
    promise: "Carry it. Seal it. Bin it. Confidently.",
    image: "/shop/period-private-pouch-hero.jpg",
    imageAlt: "ForrHer Period Private Pouch on a calm vanity surface",
    gallery: [
      {
        src: "/shop/period-private-pouch-hero.jpg",
        alt: "ForrHer Period Private Pouch lifestyle product photo",
      },
    ],
    benefits: [
      "Leak-resistant moisture-lock material",
      "Secure seal for complete privacy",
      "Discreet design that looks like a regular pouch",
      "Compact and portable for bags or pockets",
      "Durable and reusable for everyday use",
    ],
    perfectFor: ["Home", "Work", "School", "Travel", "Hotels", "Public spaces"],
    details: [
      "Stay confident when you need a private moment of care",
      "Keep disposal hygienic and contained",
      "Easy to carry without drawing attention",
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
    promise: "Self-care, beautifully together.",
    image: "/shop/period-everyday-organizer-hero.jpg",
    imageAlt: "ForrHer Period and Everyday Organizer closed product photo",
    gallery: [
      {
        src: "/shop/period-everyday-organizer-hero.jpg",
        alt: "ForrHer Period and Everyday Organizer closed view",
      },
      {
        src: "/shop/period-everyday-organizer-open.jpg",
        alt: "ForrHer Period and Everyday Organizer open compartments",
      },
    ],
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
    compartments: [
      { label: "Pads", body: "Space for 6–8 pads in varied sizes." },
      { label: "Liners", body: "A calm pocket for everyday liners." },
      { label: "Tampons or cups", body: "Ready for what you prefer." },
      { label: "Wipes & tissues", body: "Freshness kept close." },
      { label: "Sanitizer & essentials", body: "Lip balm, hair ties, and more." },
      { label: "Heat pad", body: "Comfort when cramps arrive." },
      { label: "Pain relief pocket", body: "A small, private compartment." },
      { label: "Sweet treat", body: "A little kindness for hard days." },
      { label: "Hand cream & mirror", body: "Soft self-care on the go." },
      { label: "Secure zip pocket", body: "For what you want kept private." },
      { label: "Luna pouch space", body: "Room for discreet disposal pouches." },
    ],
    colors: [
      { name: "Sage Green", note: "Calm. Fresh. Natural.", swatch: "#DCE6DD" },
      { name: "Blush Pink", note: "Soft. Feminine. Uplifting.", swatch: "#E8C9C9" },
      {
        name: "Mocha Beige",
        note: "Classic. Versatile. Timeless.",
        swatch: "#8B6B55",
      },
    ],
    priceLabel: "Payment link coming soon",
  },
];

export function getShopProduct(slug: string) {
  return shopProducts.find((product) => product.slug === slug);
}
