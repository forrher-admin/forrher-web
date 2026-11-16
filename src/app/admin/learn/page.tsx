import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listAllArticlesForAdmin } from "@/lib/articles";

export const instant = false;

export const metadata = {
  title: "Learn admin",
  description: "Add and edit ForrHer Learn articles.",
};

export default async function AdminLearnPage() {
  await requireAdmin();
  const articles = await listAllArticlesForAdmin();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-mocha">Learn admin</h1>
          <p className="mt-2 text-base text-muted">
            Add, edit, publish, or unpublish articles.
          </p>
        </div>
        <Link
          href="/admin/learn/new"
          className="forrher-press inline-flex min-h-11 items-center rounded-xl bg-mocha px-4 text-base text-on-primary hover:bg-primary-hover"
        >
          New article
        </Link>
      </div>

      <ul className="mt-10 space-y-3">
        {articles.map((article) => (
          <li
            key={article.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-4"
          >
            <div>
              <p className="text-sm text-gold">
                {article.published ? "Published" : "Draft"} · {article.category}
              </p>
              <p className="font-heading text-xl text-mocha">{article.title}</p>
            </div>
            <Link
              href={`/admin/learn/${article.id}`}
              className="forrher-press inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-base hover:bg-cream"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
