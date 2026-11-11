import { z } from "zod";

export const authCredentialsSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Use at least 8 characters for your password."),
});

export const articleFormSchema = z.object({
  title: z.string().trim().min(3, "Title is too short.").max(160),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only.",
    ),
  summary: z.string().trim().min(10, "Add a short summary.").max(400),
  body_markdown: z.string().trim().min(20, "Article body is too short."),
  category: z.string().trim().min(2).max(80),
  source_label: z.string().trim().max(120).optional().or(z.literal("")),
  last_reviewed_at: z.string().trim().optional().or(z.literal("")),
  published: z.boolean(),
  related_slugs: z.string().trim().optional().or(z.literal("")),
});

export const deletionRequestSchema = z.object({
  confirm: z
    .string()
    .trim()
    .refine((value) => value === "DELETE", {
      message: "Type DELETE to confirm your request.",
    }),
});

export const saveItemSchema = z.object({
  item_type: z.enum(["article", "tool", "today"]),
  item_key: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(200),
  href: z.string().trim().min(1).max(300),
});

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseRelatedSlugs(value: string | undefined) {
  if (!value?.trim()) return [] as string[];
  return value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}
