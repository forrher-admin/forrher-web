import { createArticleAction } from "@/app/actions/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { requireAdmin } from "@/lib/auth";

export const instant = false;

export const metadata = {
  title: "New article",
};

export default async function NewArticlePage() {
  await requireAdmin();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text">New article</h1>
      <p className="mt-2 text-base text-muted">
        Use placeholder health copy until ForrHer-approved content is ready.
      </p>
      <div className="mt-8">
        <ArticleForm action={createArticleAction} />
      </div>
    </section>
  );
}
