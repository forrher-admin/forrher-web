"use client";

import { useActionState } from "react";
import type { ArticleFormState } from "@/app/actions/articles";
import type { Article } from "@/lib/types";
import { slugifyTitle } from "@/lib/validation";

type ArticleFormProps = {
  article?: Article;
  action: (
    prev: ArticleFormState,
    formData: FormData,
  ) => Promise<ArticleFormState>;
};

const initialState: ArticleFormState = {};

export function ArticleForm({ article, action }: ArticleFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-base text-text">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={article?.title ?? ""}
          className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-base text-text">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={article?.slug ?? ""}
          placeholder={slugifyTitle(article?.title ?? "my-article")}
          className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-base text-text">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={3}
          defaultValue={article?.summary ?? ""}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-base"
        />
      </div>

      <div>
        <label htmlFor="body_markdown" className="block text-base text-text">
          Body (Markdown)
        </label>
        <textarea
          id="body_markdown"
          name="body_markdown"
          required
          rows={14}
          defaultValue={article?.body_markdown ?? ""}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-base text-text">
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            defaultValue={article?.category ?? ""}
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base"
          />
        </div>
        <div>
          <label htmlFor="source_label" className="block text-base text-text">
            Source label
          </label>
          <input
            id="source_label"
            name="source_label"
            defaultValue={article?.source_label ?? ""}
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="last_reviewed_at" className="block text-base text-text">
            Last reviewed
          </label>
          <input
            id="last_reviewed_at"
            name="last_reviewed_at"
            type="date"
            defaultValue={article?.last_reviewed_at ?? ""}
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base"
          />
        </div>
        <div>
          <label htmlFor="related_slugs" className="block text-base text-text">
            Related slugs (comma-separated)
          </label>
          <input
            id="related_slugs"
            name="related_slugs"
            defaultValue={article?.related_slugs?.join(", ") ?? ""}
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base"
          />
        </div>
      </div>

      <label className="flex min-h-11 items-center gap-3 text-base text-text">
        <input
          type="checkbox"
          name="published"
          defaultChecked={article?.published ?? false}
          className="size-5"
        />
        Published
      </label>

      {state.error ? (
        <p className="text-base text-accent" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-base text-primary" role="status">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-base text-surface hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save article"}
      </button>
    </form>
  );
}
