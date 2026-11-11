import Link from "next/link";
import { redirect } from "next/navigation";
import { removeSavedItemAction } from "@/app/actions/saved-items";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { SavedItem } from "@/lib/types";

export const instant = false;

export const metadata = {
  title: "Saved items",
  description: "Items you saved on ForrHer.",
};

async function RemoveButton({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await removeSavedItemAction(id);
      }}
    >
      <button
        type="submit"
        className="inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm text-muted hover:bg-accent-soft"
      >
        Remove
      </button>
    </form>
  );
}

export default async function SavedItemsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const supabase = await createClient();
  const { data } = await supabase
    .from("saved_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const items = (data ?? []) as SavedItem[];

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text">Saved items</h1>
      <p className="mt-3 text-base text-muted">
        Your private list of Today results and Learn articles.
      </p>

      {items.length === 0 ? (
        <p className="mt-8 text-base text-muted">No saved items yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <div>
                <p className="text-sm capitalize text-accent">{item.item_type}</p>
                <Link
                  href={item.href}
                  className="text-base text-primary underline underline-offset-2"
                >
                  {item.title}
                </Link>
              </div>
              <RemoveButton id={item.id} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8">
        <Link href="/account" className="text-base text-muted underline underline-offset-2">
          Back to account
        </Link>
      </p>
    </section>
  );
}
