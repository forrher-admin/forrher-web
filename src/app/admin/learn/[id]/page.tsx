import { notFound } from "next/navigation";
import {
  deleteArticleAction,
  updateArticleAction,
} from "@/app/actions/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { getArticleById } from "@/lib/articles";
import { requireAdmin } from "@/lib/auth";

export const instant = false;

export const metadata = {
  title: "Edit article",
};

export default async function EditArticlePage({
  params,
}: PageProps<"/admin/learn/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const updateAction = updateArticleAction.bind(null, article.id);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text">Edit article</h1>
      <div className="mt-8">
        <ArticleForm article={article} action={updateAction} />
      </div>
      <form
        className="mt-8"
        action={async () => {
          "use server";
          await deleteArticleAction(article.id);
        }}
      >
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-base text-muted hover:bg-accent-soft"
        >
          Delete article
        </button>
      </form>
    </section>
  );
}
