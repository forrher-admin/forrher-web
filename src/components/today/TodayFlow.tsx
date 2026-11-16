"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SaveItemButton } from "@/components/SaveItemButton";
import { SituationChips } from "@/components/SituationChips";
import {
  getSuggestions,
  type FlowSuggestion,
  type SuggestionKind,
  type TodayFlow as TodayFlowType,
} from "@/content/today/flows";

type TodayFlowProps = {
  flow?: TodayFlowType;
  query?: string;
  routedFromQuery?: boolean;
  isLoggedIn: boolean;
};

const kindLabels: Record<SuggestionKind, string> = {
  learn: "Learn",
  tool: "Tool",
  shop: "Shop",
  care: "Care",
};

function SuggestionCard({ suggestion }: { suggestion: FlowSuggestion }) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_rgba(74,44,42,0.04)]">
      {suggestion.kind ? (
        <p className="text-sm tracking-[0.14em] text-gold uppercase">
          {kindLabels[suggestion.kind]}
        </p>
      ) : null}
      <h3 className="mt-2 font-heading text-xl text-primary">
        {suggestion.title}
      </h3>
      <p className="mt-2 text-base text-muted">{suggestion.body}</p>
      {suggestion.href ? (
        <Link
          href={suggestion.href}
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-base text-surface transition-colors hover:bg-primary-hover"
        >
          {suggestion.linkLabel ?? "Open"}
        </Link>
      ) : null}
    </li>
  );
}

export function TodayFlowClient({
  flow,
  query,
  routedFromQuery = false,
  isLoggedIn,
}: TodayFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const finished = Boolean(flow && stepIndex >= flow.steps.length);
  const suggestions = useMemo(() => {
    if (!flow || !finished) return [];
    return getSuggestions(flow, answers);
  }, [flow, finished, answers]);

  if (!flow) {
    return (
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-cream via-background to-sage/40 p-6 sm:p-8">
          <p className="font-heading text-4xl text-primary sm:text-5xl">
            ForrHer Today
          </p>
          <p className="mt-3 text-sm tracking-[0.18em] text-gold uppercase">
            Calm guidance for this day
          </p>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Choose what today feels like. We&apos;ll offer practical next steps —
            never a diagnosis.
          </p>
          {query ? (
            <p className="mt-5 rounded-xl border border-border bg-surface/90 px-4 py-3 text-base text-text">
              You asked: <span className="font-medium">{query}</span>. Pick the
              closest situation below to continue.
            </p>
          ) : null}
        </div>
        <SituationChips />
        <ProfessionalNote />
      </div>
    );
  }

  const step = flow.steps[stepIndex];
  const progress =
    flow.steps.length > 0
      ? Math.min(100, Math.round((stepIndex / flow.steps.length) * 100))
      : 0;

  function chooseOption(optionId: string) {
    if (!flow || !step) return;
    setAnswers((current) => ({ ...current, [step.id]: optionId }));
    setStepIndex((value) => value + 1);
  }

  function goBack() {
    if (stepIndex === 0) return;
    const previous = flow?.steps[stepIndex - 1];
    if (previous) {
      setAnswers((current) => {
        const next = { ...current };
        delete next[previous.id];
        return next;
      });
    }
    setStepIndex((value) => Math.max(0, value - 1));
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm tracking-[0.14em] text-gold uppercase">
          ForrHer Today
        </p>
        <h1 className="mt-2 font-heading text-3xl text-text sm:text-4xl">
          {flow.label}
        </h1>
        <p className="mt-4 text-lg text-muted">{flow.intro}</p>
        {routedFromQuery && query ? (
          <p className="mt-3 text-sm text-muted">
            Matched from your question: <span className="font-medium text-text">{query}</span>
          </p>
        ) : null}
      </div>

      {!finished && step ? (
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Step {stepIndex + 1} of {flow.steps.length}
            </p>
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-11 items-center text-base text-primary underline underline-offset-2"
              >
                Back
              </button>
            ) : null}
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-accent-soft"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>
          <h2 className="mt-5 font-heading text-2xl text-text">{step.question}</h2>
          <ul className="mt-5 flex flex-col gap-2">
            {step.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => chooseOption(option.id)}
                  className="flex min-h-11 w-full items-center rounded-xl border border-border px-4 text-left text-base text-text transition-colors hover:border-gold hover:bg-cream"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {finished ? (
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl text-text">
              Suggestions for today
            </h2>
            <p className="mt-2 text-base text-muted">
              General ideas only. Choose what feels kind and doable.
            </p>
          </div>

          <ul className="space-y-4">
            {suggestions.map((suggestion) => (
              <SuggestionCard
                key={`${suggestion.title}-${suggestion.href ?? "care"}`}
                suggestion={suggestion}
              />
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-4 text-base text-text hover:bg-accent-soft"
            >
              Start again
            </button>
            <Link
              href="/today"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-4 text-base text-text hover:bg-accent-soft"
            >
              Choose another situation
            </Link>
            <SaveItemButton
              isLoggedIn={isLoggedIn}
              item={{
                item_type: "today",
                item_key: flow.slug,
                title: `Today: ${flow.label}`,
                href: `/today?situation=${flow.slug}`,
              }}
            />
          </div>

          <ProfessionalNote />
        </div>
      ) : null}
    </div>
  );
}
