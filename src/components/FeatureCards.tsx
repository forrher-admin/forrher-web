import Link from "next/link";

const features = [
  {
    href: "/learn",
    title: "Learn",
    description: "Clear articles written in plain language.",
  },
  {
    href: "/tools",
    title: "Tools",
    description: "Simple checklists and plans for real days.",
  },
  {
    href: "/shop",
    title: "Shop",
    description: "Thoughtful products when you need them.",
  },
  {
    href: "/spaces",
    title: "Spaces",
    description: "Places to gather, rest, and feel supported.",
  },
] as const;

export function FeatureCards() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((feature, index) => (
        <li key={feature.href}>
          <Link
            href={feature.href}
            className="forrher-press group flex h-full flex-col justify-between rounded-2xl border border-border bg-cream/60 p-5 hover:border-gold hover:bg-cream"
          >
            <div>
              <p className="text-sm text-gold">0{index + 1}</p>
              <h2 className="mt-2 font-heading text-2xl text-mocha sm:text-3xl">
                {feature.title}
              </h2>
              <p className="mt-2 text-base text-muted">{feature.description}</p>
            </div>
            <span className="mt-6 text-base text-mocha underline underline-offset-4">
              Open {feature.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
