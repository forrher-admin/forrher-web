import { Suspense } from "react";
import { TodayFlowClient } from "@/components/today/TodayFlow";
import { getTodayFlow } from "@/content/today/flows";
import { getCurrentUser } from "@/lib/auth";
import { routeQueryToSituation } from "@/lib/today/route-query";

export const instant = false;

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
  const query = params.q?.trim();
  const routedSlug = params.situation
    ? undefined
    : routeQueryToSituation(query);
  const situationSlug = params.situation ?? routedSlug;
  const flow = getTodayFlow(situationSlug);
  const user = await getCurrentUser();

  return (
    <TodayFlowClient
      flow={flow}
      query={query}
      routedFromQuery={Boolean(!params.situation && routedSlug)}
      isLoggedIn={Boolean(user)}
    />
  );
}

export default function TodayPage({ searchParams }: PageProps<"/today">) {
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
