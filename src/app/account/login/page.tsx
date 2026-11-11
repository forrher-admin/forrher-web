import Link from "next/link";
import { signInAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const instant = false;

export const metadata = {
  title: "Sign in",
  description: "Sign in to your ForrHer account.",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/account");

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text">Sign in</h1>
      <p className="mt-3 text-base text-muted">
        Welcome back. Your saved items stay private to your account.
      </p>
      <div className="mt-8">
        <AuthForm
          action={signInAction}
          submitLabel="Sign in"
          pendingLabel="Signing in…"
        />
      </div>
      <p className="mt-6 text-base text-muted">
        New here?{" "}
        <Link href="/account/signup" className="text-primary underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </section>
  );
}
