import Link from "next/link";
import { situations } from "@/lib/situations";

export function SituationChips() {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Situations">
      {situations.map((situation) => (
        <li key={situation.slug}>
          <Link
            href={`/today?situation=${situation.slug}`}
            className="forrher-press inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-3 text-[0.9375rem] text-text hover:border-gold hover:bg-cream sm:px-3.5 sm:text-base"
          >
            {situation.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
