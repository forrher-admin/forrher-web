"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SaveItemButton } from "@/components/SaveItemButton";
import {
  getSuggestions,
  type TodayFlow as TodayFlowType,
} from "@/content/today/flows";
import { SituationChips } from "@/components/SituationChips";

type TodayFlowProps = {
  flow?: TodayFlowType;
  query?: string;
  isLoggedIn: boolean;
};

export function TodayFlowClient({ flow, query, isLoggedIn }: TodayFlowProps) {
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
        <div>
          <h1 className="font-heading text-3xl text-text sm:text-4xl">
            ForrHer Today
          </h1>
          <p className="mt-4 text-lg text-muted">
            Choose what today feels like, or ask in your own words from the home
            page. We&apos;ll offer calm, practical next steps — never a diagnosis.
          </p>
          {query ? (
            <p className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-base text-text">
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

  function chooseOption(optionId: string) {
    if (!flow || !step) return;
    const nextAnswers = { ...answers, [step.id]: optionId };
    setAnswers(nextAnswers);
    setStepIndex((value) => value + 1);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm tracking-[0.14em] text-accent uppercase">
          ForrHer Today
        </p>
        <h1 className="mt-2 font-heading text-3xl text-text sm:text-4xl">
          {flow.label}
        </h1>
        <p className="mt-4 text-lg text-muted">{flow.intro}</p>
      </div>

      {!finished && step ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">
            Step {stepIndex + 1} of {flow.steps.length}
          </p>
          <h2 className="mt-2 font-heading text-2xl text-text">{step.question}</h2>
          <ul className="mt-5 flex flex-col gap-2">
            {step.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => chooseOption(option.id)}
                  className="flex min-h-11 w-full items-center rounded-lg border border-border px-4 text-left text-base text-text transition-colors hover:border-accent hover:bg-accent-soft"
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
              <li
                key={suggestion.title}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="font-heading text-xl text-primary">
                  {suggestion.title}
                </h3>
                <p className="mt-2 text-base text-muted">{suggestion.body}</p>
                {suggestion.href ? (
                  <Link
                    href={suggestion.href}
                    className="mt-4 inline-flex min-h-11 items-center text-base text-primary underline underline-offset-2"
                  >
                    {suggestion.linkLabel ?? "Learn more"}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
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
