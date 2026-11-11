export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: "user" | "admin";
  deletion_requested_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body_markdown: string;
  category: string;
  source_label: string | null;
  last_reviewed_at: string | null;
  published: boolean;
  related_slugs: string[];
  created_at: string;
  updated_at: string;
};

export type SavedItem = {
  id: string;
  user_id: string;
  item_type: "article" | "tool" | "today";
  item_key: string;
  title: string;
  href: string;
  created_at: string;
};
