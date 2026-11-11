"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  articleFormSchema,
  parseRelatedSlugs,
  slugifyTitle,
} from "@/lib/validation";

export type ArticleFormState = {
  error?: string;
  success?: string;
};

function formToArticleInput(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug") || slugifyTitle(String(formData.get("title") ?? "")),
    summary: formData.get("summary"),
    body_markdown: formData.get("body_markdown"),
    category: formData.get("category"),
    source_label: formData.get("source_label") ?? "",
    last_reviewed_at: formData.get("last_reviewed_at") ?? "",
    published: formData.get("published") === "on",
    related_slugs: formData.get("related_slugs") ?? "",
  };
}

export async function createArticleAction(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireAdmin();

  const parsed = articleFormSchema.safeParse(formToArticleInput(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid article." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("articles").insert({
    title: parsed.data.title,
    slug: parsed.data.slug,
    summary: parsed.data.summary,
    body_markdown: parsed.data.body_markdown,
    category: parsed.data.category,
    source_label: parsed.data.source_label || null,
    last_reviewed_at: parsed.data.last_reviewed_at || null,
    published: parsed.data.published,
    related_slugs: parseRelatedSlugs(parsed.data.related_slugs),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/learn");
  revalidatePath("/admin/learn");
  redirect("/admin/learn");
}

export async function updateArticleAction(
  id: string,
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireAdmin();

  const parsed = articleFormSchema.safeParse(formToArticleInput(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid article." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      summary: parsed.data.summary,
      body_markdown: parsed.data.body_markdown,
      category: parsed.data.category,
      source_label: parsed.data.source_label || null,
      last_reviewed_at: parsed.data.last_reviewed_at || null,
      published: parsed.data.published,
      related_slugs: parseRelatedSlugs(parsed.data.related_slugs),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("slug")
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/learn");
  revalidatePath(`/learn/${data.slug}`);
  revalidatePath("/admin/learn");
  return { success: "Article saved." };
}

export async function deleteArticleAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    return { ok: false as const, message: error.message };
  }

  revalidatePath("/learn");
  revalidatePath("/admin/learn");
  redirect("/admin/learn");
}
