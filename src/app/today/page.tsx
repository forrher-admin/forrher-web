import { Suspense } from "react";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { getSituationLabel } from "@/lib/situations";

export const metadata = {
  title: "Today",
  description: "Gentle guidance for the day you are having.",
};

async function TodayContent({
  searchParams,
}: {
  searchParams: Promise<{ situation?: string; q?: string }>;
}) {
  const params = await searchParams;
  const situationLabel = getSituationLabel(params.situation);
  const query = params.q?.trim();

  return (
    <>
      <h1 className="font-heading text-3xl text-text sm:text-4xl">
        ForrHer Today
      </h1>
      <p className="mt-4 text-lg text-muted">
        This guided flow is coming together. Thank you for your patience.
      </p>

      {situationLabel ? (
        <p className="mt-6 rounded-lg border border-border bg-surface px-4 py-3 text-base text-text">
          You chose: <span className="font-medium">{situationLabel}</span>
        </p>
      ) : null}

      {query ? (
        <p className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-base text-text">
          You asked: <span className="font-medium">{query}</span>
        </p>
      ) : null}

      <div className="mt-10">
        <ProfessionalNote />
      </div>
    </>
  );
}

export default function TodayPage({
  searchParams,
}: PageProps<"/today">) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Suspense
        fallback={
          <p className="text-lg text-muted">Loading today&apos;s guidance…</p>
        }
      >
        <TodayContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
