"use client";

import { useActionState } from "react";
import {
  requestDeletionAction,
  type AuthFormState,
} from "@/app/actions/auth";

const initialState: AuthFormState = {};

export function DeletionRequestForm() {
  const [state, formAction, pending] = useActionState(
    requestDeletionAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-border bg-surface p-5">
      <h2 className="font-heading text-2xl text-text">Request account deletion</h2>
      <p className="text-base text-muted">
        Type DELETE to confirm. This records your request. Processing is manual
        until automated deletion email is enabled.
      </p>
      <div>
        <label htmlFor="confirm" className="block text-base text-text">
          Confirmation
        </label>
        <input
          id="confirm"
          name="confirm"
          required
          className="mt-1 min-h-11 w-full rounded-md border border-border px-3 text-base"
          placeholder="DELETE"
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
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-4 text-base text-text hover:bg-accent-soft disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit deletion request"}
      </button>
    </form>
  );
}
