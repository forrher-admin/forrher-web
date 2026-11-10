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
    <ul className="grid gap-4 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature.href}>
          <Link
            href={feature.href}
            className="group flex h-full min-h-28 flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
          >
            <h2 className="font-heading text-2xl text-primary group-hover:text-primary-hover">
              {feature.title}
            </h2>
            <p className="mt-2 text-base text-muted">{feature.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
