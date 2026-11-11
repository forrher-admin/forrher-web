"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { saveItemAction } from "@/app/actions/saved-items";

type SaveItemButtonProps = {
  isLoggedIn: boolean;
  item: {
    item_type: "article" | "tool" | "today";
    item_key: string;
    title: string;
    href: string;
  };
};

export function SaveItemButton({ isLoggedIn, item }: SaveItemButtonProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <Link
        href="/account/login"
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-base text-surface hover:bg-primary-hover"
      >
        Sign in to save
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const result = await saveItemAction(item);
            setMessage(result.message);
          });
        }}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-base text-surface hover:bg-primary-hover disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save for later"}
      </button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}
