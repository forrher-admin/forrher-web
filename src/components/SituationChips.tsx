import Link from "next/link";
import { situations } from "@/lib/situations";

export function SituationChips() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Situations">
      {situations.map((situation) => (
        <li key={situation.slug}>
          <Link
            href={`/today?situation=${situation.slug}`}
            className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-4 text-base text-text shadow-sm transition-colors hover:border-accent hover:bg-accent-soft"
          >
            {situation.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
