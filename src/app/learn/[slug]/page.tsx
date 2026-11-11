import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Markdown } from "@/components/Markdown";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SaveItemButton } from "@/components/SaveItemButton";
import {
  getPublishedArticleBySlug,
  listRelatedArticles,
} from "@/lib/articles";
import { getCurrentUser } from "@/lib/auth";
import type { Article } from "@/lib/types";

export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.summary,
  };
}

async function ArticleSave({ article }: { article: Article }) {
  const user = await getCurrentUser();
  return (
    <SaveItemButton
      isLoggedIn={Boolean(user)}
      item={{
        item_type: "article",
        item_key: article.slug,
        title: article.title,
        href: `/learn/${article.slug}`,
      }}
    />
  );
}

export default async function LearnArticlePage({
  params,
}: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const related = await listRelatedArticles(article.related_slugs ?? []);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm text-accent">{article.category}</p>
      <h1 className="mt-2 font-heading text-4xl text-text">{article.title}</h1>
      <p className="mt-4 text-lg text-muted">{article.summary}</p>

      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        {article.source_label ? (
          <div>
            <dt className="inline">Source: </dt>
            <dd className="inline">{article.source_label}</dd>
          </div>
        ) : null}
        {article.last_reviewed_at ? (
          <div>
            <dt className="inline">Last reviewed: </dt>
            <dd className="inline">{article.last_reviewed_at}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8">
        <Markdown content={article.body_markdown} />
      </div>

      <div className="mt-8">
        <Suspense
          fallback={
            <p className="text-sm text-muted">Checking save options…</p>
          }
        >
          <ArticleSave article={article} />
        </Suspense>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-heading text-2xl text-text">Related reading</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/learn/${item.slug}`}
                  className="text-base text-primary underline underline-offset-2"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12">
        <ProfessionalNote />
      </div>

      <p className="mt-8">
        <Link
          href="/learn"
          className="text-base text-muted underline underline-offset-2"
        >
          Back to Learn
        </Link>
      </p>
    </article>
  );
}
