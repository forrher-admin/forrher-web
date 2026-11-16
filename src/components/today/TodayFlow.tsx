"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SaveItemButton } from "@/components/SaveItemButton";
import { SituationChips } from "@/components/SituationChips";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { SoftPanel } from "@/components/ui/SoftPanel";
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
    <li className="rounded-2xl border border-border bg-cream/60 p-5">
      {suggestion.kind ? (
        <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
          {kindLabels[suggestion.kind]}
        </p>
      ) : null}
      <h3 className="mt-2 font-heading text-xl text-mocha">{suggestion.title}</h3>
      <p className="mt-2 text-base text-muted">{suggestion.body}</p>
      {suggestion.href ? (
        <Link
          href={suggestion.href}
          className="forrher-press mt-4 inline-flex min-h-11 items-center rounded-xl bg-mocha px-4 text-base text-on-primary hover:bg-primary-hover"
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
      <div className="space-y-8">
        <SoftPanel className="bg-cream">
          <p className="font-heading text-4xl text-mocha sm:text-5xl">
            ForrHer Today
          </p>
          <p className="mt-3 text-sm font-medium tracking-[0.14em] text-gold uppercase">
            Calm guidance for this day
          </p>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Choose what today feels like. We&apos;ll offer practical next steps —
            never a diagnosis.
          </p>
          {query ? (
            <p className="mt-5 rounded-xl border border-border bg-surface px-4 py-3 text-base text-text">
              You asked: <span className="font-medium">{query}</span>. Pick the
              closest situation below to continue.
            </p>
          ) : null}
        </SoftPanel>
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
        <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
          ForrHer Today
        </p>
        <h1 className="mt-2 font-heading text-3xl text-mocha sm:text-4xl">
          {flow.label}
        </h1>
        <p className="mt-4 text-lg text-muted">{flow.intro}</p>
        {routedFromQuery && query ? (
          <p className="mt-3 text-sm text-muted">
            Matched from your question:{" "}
            <span className="font-medium text-text">{query}</span>
          </p>
        ) : null}
      </div>

      {!finished && step ? (
        <SoftPanel className="bg-surface">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Step {stepIndex + 1} of {flow.steps.length}
            </p>
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-11 items-center text-base text-mocha underline underline-offset-4"
              >
                Back
              </button>
            ) : null}
          </div>
          <ProgressRail value={Math.max(progress, 8)} className="mt-3" />
          <h2 className="mt-5 font-heading text-2xl text-text">{step.question}</h2>
          <ul className="mt-5 flex flex-col gap-2">
            {step.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => chooseOption(option.id)}
                  className="forrher-press flex min-h-11 w-full items-center rounded-xl border border-border bg-cream/40 px-4 text-left text-base text-text hover:border-gold hover:bg-cream"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </SoftPanel>
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
              className="forrher-press inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-base text-text hover:bg-cream"
            >
              Start again
            </button>
            <Link
              href="/today"
              className="forrher-press inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-base text-text hover:bg-cream"
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
