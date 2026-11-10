export const situations = [
  { slug: "period-started", label: "Period started" },
  { slug: "cramps", label: "Cramps" },
  { slug: "heavy-flow", label: "Heavy flow" },
  { slug: "a-leak", label: "A leak" },
  { slug: "feeling-tired", label: "Feeling tired" },
  { slug: "travelling", label: "Travelling" },
  { slug: "work-day", label: "Work day" },
  { slug: "something-feels-different", label: "Something feels different" },
] as const;

export type SituationSlug = (typeof situations)[number]["slug"];

export function getSituationLabel(slug: string | undefined) {
  if (!slug) return undefined;
  return situations.find((situation) => situation.slug === slug)?.label;
}
