import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import { DeletionRequestForm } from "@/components/auth/DeletionRequestForm";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { SavedItem } from "@/lib/types";

export const instant = false;

export const metadata = {
  title: "Account",
  description: "Manage your ForrHer account, saved items, and privacy requests.",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const { data: saved } = await supabase
    .from("saved_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const savedItems = (saved ?? []) as SavedItem[];

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text sm:text-4xl">Account</h1>
      <p className="mt-3 text-lg text-muted">
        Signed in as {profile?.email ?? user.email}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/account/saved"
          className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-base text-surface hover:bg-primary-hover"
        >
          Saved items
        </Link>
        {profile?.role === "admin" ? (
          <Link
            href="/admin/learn"
            className="inline-flex min-h-11 items-center rounded-md border border-border bg-surface px-4 text-base text-text hover:bg-accent-soft"
          >
            Learn admin
          </Link>
        ) : null}
        <form action={signOutAction}>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-md border border-border bg-surface px-4 text-base text-text hover:bg-accent-soft"
          >
            Sign out
          </button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-2xl text-text">Recent saved items</h2>
        {savedItems.length === 0 ? (
          <p className="mt-3 text-base text-muted">
            Nothing saved yet. Save a Today result or Learn article to see it
            here.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {savedItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-base text-primary underline underline-offset-2"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-12">
        <DeletionRequestForm />
        {profile?.deletion_requested_at ? (
          <p className="mt-3 text-sm text-muted">
            Deletion requested on{" "}
            {new Date(profile.deletion_requested_at).toLocaleString()}.
          </p>
        ) : null}
      </div>

      <p className="mt-8 text-sm text-muted">
        ForrHer keeps only what is needed for your account. Read our{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy
        </Link>{" "}
        note.
      </p>
    </section>
  );
}
