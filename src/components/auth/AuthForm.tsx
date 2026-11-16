"use client";

import { useActionState } from "react";
import type { AuthFormState } from "@/app/actions/auth";

type AuthFormProps = {
  action: (
    prev: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  submitLabel: string;
  pendingLabel: string;
};

const initialState: AuthFormState = {};

export function AuthForm({ action, submitLabel, pendingLabel }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-border bg-cream/50 p-5 sm:p-6">
      <div>
        <label htmlFor="email" className="block text-base text-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="forrher-input mt-1"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-base text-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="forrher-input mt-1"
        />
      </div>

      {state.error ? (
        <p className="text-base text-mocha" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-base text-muted" role="status">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="forrher-press inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-mocha px-4 text-base text-on-primary hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
