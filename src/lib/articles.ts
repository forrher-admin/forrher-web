import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

export async function listPublishedArticles() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("listPublishedArticles", error.message);
      return [] as Article[];
    }

    return (data ?? []) as Article[];
  } catch (error) {
    console.error("listPublishedArticles", error);
    return [] as Article[];
  }
}

export async function getPublishedArticleBySlug(slug: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("getPublishedArticleBySlug", error.message);
      return null;
    }

    return data as Article | null;
  } catch (error) {
    console.error("getPublishedArticleBySlug", error);
    return null;
  }
}

export async function listRelatedArticles(slugs: string[]) {
  if (!slugs.length) return [] as Article[];

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, summary, category, published")
      .eq("published", true)
      .in("slug", slugs);

    if (error) {
      console.error("listRelatedArticles", error.message);
      return [] as Article[];
    }

    return (data ?? []) as Article[];
  } catch (error) {
    console.error("listRelatedArticles", error);
    return [] as Article[];
  }
}

export async function listAllArticlesForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("listAllArticlesForAdmin", error.message);
    return [] as Article[];
  }

  return (data ?? []) as Article[];
}

export async function getArticleById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getArticleById", error.message);
    return null;
  }

  return data as Article | null;
}
