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
    <ul className="divide-y divide-border border-y border-border">
      {features.map((feature, index) => (
        <li key={feature.href}>
          <Link
            href={feature.href}
            className="group flex items-baseline justify-between gap-6 py-6 transition-colors hover:bg-accent-soft/30"
          >
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span className="font-heading text-sm text-gold">
                0{index + 1}
              </span>
              <div>
                <h2 className="font-heading text-2xl text-primary transition-colors group-hover:text-primary-hover sm:text-3xl">
                  {feature.title}
                </h2>
                <p className="mt-1 max-w-xl text-base text-muted">
                  {feature.description}
                </p>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="text-xl text-accent transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
