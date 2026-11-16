import Link from "next/link";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { listTools } from "@/content/tools/definitions";

export const metadata = {
  title: "Tools",
  description: "Practical checklists and plans for real days.",
};

export default function ToolsPage() {
  const tools = listTools();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm tracking-[0.16em] text-gold uppercase">
        ForrHer Tools
      </p>
      <h1 className="mt-2 font-heading text-4xl text-text">
        Practical tools for real days
      </h1>
      <p className="mt-4 text-lg text-muted">
        Short guided tools you can finish on your phone. Save or print the
        result when it helps.
      </p>

      <ul className="mt-10 space-y-4">
        {tools.map((tool, index) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="group block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold hover:bg-cream/60"
            >
              <p className="text-sm text-gold">0{index + 1}</p>
              <h2 className="mt-1 font-heading text-2xl text-primary group-hover:text-primary-hover">
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
    </section>
  );
}
