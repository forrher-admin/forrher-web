"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { saveItemSchema } from "@/lib/validation";

export async function saveItemAction(input: unknown) {
  const parsed = saveItemSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Could not save that item." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, message: "Please sign in to save items." };
  }

  const { error } = await supabase.from("saved_items").upsert(
    {
      user_id: user.id,
      ...parsed.data,
    },
    { onConflict: "user_id,item_type,item_key" },
  );

  if (error) {
    return { ok: false as const, message: "Saving failed. Please try again." };
  }

  revalidatePath("/account");
  revalidatePath("/account/saved");
  return { ok: true as const, message: "Saved to your account." };
}

export async function removeSavedItemAction(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, message: "Please sign in." };
  }

  const { error } = await supabase
    .from("saved_items")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { ok: false as const, message: "Could not remove that item." };
  }

  revalidatePath("/account/saved");
  revalidatePath("/account");
  return { ok: true as const, message: "Removed." };
}
