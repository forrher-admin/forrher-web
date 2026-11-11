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
    <form action={formAction} className="space-y-4">
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
          className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base text-text"
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
          className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base text-text"
        />
      </div>

      {state.error ? (
        <p className="text-base text-accent" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-base text-primary" role="status">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-base text-surface hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
