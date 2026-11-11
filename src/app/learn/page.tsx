import Link from "next/link";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { listPublishedArticles } from "@/lib/articles";

export const instant = false;

export const metadata = {
  title: "Learn",
  description: "Clear women's health articles in plain language.",
};

export default async function LearnPage() {
  const articles = await listPublishedArticles();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text sm:text-4xl">
        ForrHer Learn
      </h1>
      <p className="mt-4 text-lg text-muted">
        Short, calm articles in plain language. Content here is general
        information, not personal medical advice.
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-lg border border-border bg-surface px-4 py-5 text-base text-muted">
          Articles will appear here once the database is set up and content is
          published. If you are the site owner, run the Stage 2 SQL migration in
          Supabase.
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/learn/${article.slug}`}
                className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
              >
                <p className="text-sm text-accent">{article.category}</p>
                <h2 className="mt-1 font-heading text-2xl text-primary">
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
    </section>
  );
}
