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
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-border bg-cream/50 p-5 sm:p-6"
    >
      <h2 className="font-heading text-2xl text-mocha">
        Request account deletion
      </h2>
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
          className="forrher-input mt-1"
          placeholder="DELETE"
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
        className="forrher-press inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-base text-text hover:bg-cream disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit deletion request"}
      </button>
    </form>
  );
}
