import Link from "next/link";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { PageShell } from "@/components/ui/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoftPanel } from "@/components/ui/SoftPanel";
import { listPublishedArticles } from "@/lib/articles";

export const instant = false;

export const metadata = {
  title: "Learn",
  description: "Clear women's health articles in plain language.",
};

export default async function LearnPage() {
  const articles = await listPublishedArticles();

  return (
    <PageShell narrow>
      <SectionHeading
        eyebrow="Learn"
        title="Calm reading in plain language"
        description="Short articles with general information — not personal medical advice."
      />

      {articles.length === 0 ? (
        <SoftPanel className="mt-10">
          <p className="text-base text-muted">
            Articles will appear here once the database is set up and content is
            published. If you are the site owner, run the Stage 2 SQL migration
            in Supabase.
          </p>
        </SoftPanel>
      ) : (
        <ul className="mt-10 space-y-4">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/learn/${article.slug}`}
                className="forrher-press block rounded-2xl border border-border bg-cream/50 p-5 hover:border-gold hover:bg-cream"
              >
                <p className="text-sm font-medium text-gold">{article.category}</p>
                <h2 className="mt-1 font-heading text-2xl text-mocha">
                  {article.title}
                </h2>
                <p className="mt-2 text-base text-muted">{article.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12">
        <ProfessionalNote />
      </div>
    </PageShell>
  );
}
