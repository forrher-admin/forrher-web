"use client";

import { useActionState } from "react";
import {
  submitSpaceEnquiryAction,
  type SpaceEnquiryState,
} from "@/app/actions/spaces";

const initialState: SpaceEnquiryState = {};

export function SpacesEnquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitSpaceEnquiryAction,
    initialState,
  );

  if (state.success) {
    return (
      <div
        className="rounded-2xl border border-border bg-cream/70 p-5 sm:p-6"
        role="status"
      >
        <h3 className="font-heading text-2xl text-mocha">Enquiry received</h3>
        <p className="mt-3 text-base text-muted">{state.success}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-border bg-cream/50 p-5 sm:p-6"
    >
      <div>
        <label htmlFor="name" className="block text-base text-text">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="forrher-input mt-1"
        />
      </div>
      <div>
        <label htmlFor="organisation" className="block text-base text-text">
          Organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          required
          autoComplete="organization"
          className="forrher-input mt-1"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-base text-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="forrher-input mt-1"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-base text-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="forrher-input mt-1 min-h-28 py-3"
        />
      </div>

      {state.error ? (
        <p className="text-base text-mocha" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="forrher-press inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-mocha px-4 text-base text-on-primary hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
