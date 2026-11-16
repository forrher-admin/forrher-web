import type { SituationSlug } from "@/lib/situations";
import { situations } from "@/lib/situations";

const keywordMap: { slug: SituationSlug; keywords: string[] }[] = [
  {
    slug: "cramps",
    keywords: ["cramp", "cramps", "ache", "aching", "pain", "sore"],
  },
  {
    slug: "a-leak",
    keywords: ["leak", "leaked", "stain", "stained", "accident"],
  },
  {
    slug: "heavy-flow",
    keywords: ["heavy", "heavier", "flooding", "soaking", "clots"],
  },
  {
    slug: "period-started",
    keywords: ["started", "period started", "got my period", "came early"],
  },
  {
    slug: "feeling-tired",
    keywords: ["tired", "exhausted", "fatigue", "sleepy", "drained", "low energy"],
  },
  {
    slug: "travelling",
    keywords: ["travel", "travelling", "traveling", "trip", "flight", "journey"],
  },
  {
    slug: "work-day",
    keywords: ["work", "office", "school", "class", "meeting", "shift"],
  },
  {
    slug: "something-feels-different",
    keywords: [
      "different",
      "unusual",
      "worried",
      "strange",
      "not normal",
      "changed",
    ],
  },
];

export function routeQueryToSituation(
  query: string | undefined,
): SituationSlug | undefined {
  if (!query?.trim()) return undefined;

  const normalized = query.toLowerCase().trim();

  for (const situation of situations) {
    if (normalized === situation.slug || normalized === situation.label.toLowerCase()) {
      return situation.slug;
    }
  }

  let best: SituationSlug | undefined;
  let bestScore = 0;

  for (const entry of keywordMap) {
    const score = entry.keywords.reduce((total, keyword) => {
      return normalized.includes(keyword) ? total + keyword.length : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      best = entry.slug;
    }
  }

  return bestScore > 0 ? best : undefined;
}
