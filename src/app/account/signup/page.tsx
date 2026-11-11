import Link from "next/link";
import { redirect } from "next/navigation";
import { signUpAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export const instant = false;

export const metadata = {
  title: "Create account",
  description: "Create a ForrHer account to save helpful items.",
};

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/account");

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text">Create account</h1>
      <p className="mt-3 text-base text-muted">
        Use email and password. We only collect what we need to support your
        account.
      </p>
      <div className="mt-8">
        <AuthForm
          action={signUpAction}
          submitLabel="Create account"
          pendingLabel="Creating…"
        />
      </div>
      <p className="mt-6 text-base text-muted">
        Already have an account?{" "}
        <Link href="/account/login" className="text-primary underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </section>
  );
}
