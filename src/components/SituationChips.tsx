import Link from "next/link";
import { situations } from "@/lib/situations";

export function SituationChips() {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Situations">
      {situations.map((situation) => (
        <li key={situation.slug}>
          <Link
            href={`/today?situation=${situation.slug}`}
            className="inline-flex min-h-11 items-center rounded-full border border-border/80 bg-surface/90 px-4 text-base text-text shadow-[0_8px_24px_rgba(74,44,42,0.04)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-cream"
          >
            {situation.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
