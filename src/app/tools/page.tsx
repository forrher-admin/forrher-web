import Link from "next/link";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { PageShell } from "@/components/ui/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listTools } from "@/content/tools/definitions";

export const metadata = {
  title: "Tools",
  description: "Practical checklists and plans for real days.",
};

export default function ToolsPage() {
  const tools = listTools();

  return (
    <PageShell narrow>
      <SectionHeading
        eyebrow="Tools"
        title="Practical tools for real days"
        description="Short guided tools you can finish on your phone. Save or print the result when it helps."
      />

      <ul className="mt-10 space-y-4">
        {tools.map((tool, index) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="forrher-press block rounded-2xl border border-border bg-cream/50 p-5 hover:border-gold hover:bg-cream"
            >
              <p className="text-sm text-gold">0{index + 1}</p>
              <h2 className="mt-1 font-heading text-2xl text-mocha">
                {tool.title}
              </h2>
              <p className="mt-2 text-base text-muted">{tool.summary}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <ProfessionalNote />
      </div>
    </PageShell>
  );
}
