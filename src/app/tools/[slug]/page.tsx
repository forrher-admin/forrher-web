import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ToolRunner } from "@/components/tools/ToolRunner";
import {
  getToolDefinition,
  listTools,
} from "@/content/tools/definitions";
import { getCurrentUser } from "@/lib/auth";

export const instant = false;

export function generateStaticParams() {
  return listTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tools/[slug]">) {
  const { slug } = await params;
  const tool = getToolDefinition(slug);
  if (!tool) return { title: "Tool" };
  return {
    title: tool.title,
    description: tool.summary,
  };
}

async function ToolContent({ slug }: { slug: string }) {
  const tool = getToolDefinition(slug);
  if (!tool) notFound();
  const user = await getCurrentUser();
  return <ToolRunner tool={tool} isLoggedIn={Boolean(user)} />;
}

export default async function ToolPage({
  params,
}: PageProps<"/tools/[slug]">) {
  const { slug } = await params;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Suspense
        fallback={<p className="text-lg text-muted">Loading tool…</p>}
      >
        <ToolContent slug={slug} />
      </Suspense>
    </section>
  );
}
