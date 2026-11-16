"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SaveItemButton } from "@/components/SaveItemButton";
import type { ToolDefinition, ToolStep } from "@/content/tools/types";

type ToolRunnerProps = {
  tool: ToolDefinition;
  isLoggedIn: boolean;
};

export function ToolRunner({ tool, isLoggedIn }: ToolRunnerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(
    {},
  );

  const finished = stepIndex >= tool.steps.length;
  const step = tool.steps[stepIndex] as ToolStep | undefined;

  const resultLines = useMemo(() => {
    if (!finished) return [];
    return tool.buildResult(answers);
  }, [answers, finished, tool]);

  function toggleMulti(optionId: string) {
    if (!step || step.type !== "multi") return;
    const current = Array.isArray(answers[step.id])
      ? [...(answers[step.id] as string[])]
      : [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    setAnswers((value) => ({ ...value, [step.id]: next }));
  }

  function chooseSingle(optionId: string) {
    if (!step || step.type !== "single") return;
    setAnswers((value) => ({ ...value, [step.id]: optionId }));
    setStepIndex((value) => value + 1);
  }

  function continueMulti() {
    if (!step || step.type !== "multi") return;
    if (!Array.isArray(answers[step.id]) || answers[step.id].length === 0) {
      return;
    }
    setStepIndex((value) => value + 1);
  }

  function goBack() {
    if (stepIndex === 0) return;
    const previous = tool.steps[stepIndex - 1];
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

  function printResult() {
    window.print();
  }

  const progress =
    tool.steps.length > 0
      ? Math.min(100, Math.round((stepIndex / tool.steps.length) * 100))
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm tracking-[0.14em] text-gold uppercase">
          ForrHer Tools
        </p>
        <h1 className="mt-2 font-heading text-3xl text-text sm:text-4xl">
          {tool.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{tool.intro}</p>
      </div>

      {!finished && step ? (
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Step {stepIndex + 1} of {tool.steps.length}
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
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-accent-soft" aria-hidden="true">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>
          <h2 className="mt-5 font-heading text-2xl text-text">{step.question}</h2>
          {step.help ? (
            <p className="mt-2 text-base text-muted">{step.help}</p>
          ) : null}

          <ul className="mt-5 flex flex-col gap-2">
            {step.options.map((option) => {
              const selected =
                step.type === "multi" &&
                Array.isArray(answers[step.id]) &&
                (answers[step.id] as string[]).includes(option.id);

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() =>
                      step.type === "single"
                        ? chooseSingle(option.id)
                        : toggleMulti(option.id)
                    }
                    className={`flex min-h-11 w-full items-center rounded-xl border px-4 text-left text-base transition-colors ${
                      selected
                        ? "border-primary bg-accent-soft text-text"
                        : "border-border text-text hover:border-gold hover:bg-cream"
                    }`}
                    aria-pressed={step.type === "multi" ? selected : undefined}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {step.type === "multi" ? (
            <button
              type="button"
              onClick={continueMulti}
              disabled={
                !Array.isArray(answers[step.id]) ||
                (answers[step.id] as string[]).length === 0
              }
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-base text-surface hover:bg-primary-hover disabled:opacity-50"
            >
              Continue
            </button>
          ) : null}
        </div>
      ) : null}

      {finished ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 print:border-0 print:p-0">
            <h2 className="font-heading text-2xl text-text">{tool.resultTitle}</h2>
            <p className="mt-2 text-base text-muted">{tool.resultIntro}</p>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-base text-text">
              {resultLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>

          {tool.learnLinks.length > 0 ? (
            <section>
              <h3 className="font-heading text-xl text-text">Related links</h3>
              <ul className="mt-3 space-y-2">
                {tool.learnLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-primary underline underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={printResult}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-mocha px-4 text-base text-cream hover:opacity-90"
            >
              Print or save as PDF
            </button>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-4 text-base text-text hover:bg-accent-soft"
            >
              Start again
            </button>
            <Link
              href="/tools"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-4 text-base text-text hover:bg-accent-soft"
            >
              All tools
            </Link>
            <SaveItemButton
              isLoggedIn={isLoggedIn}
              item={{
                item_type: "tool",
                item_key: tool.slug,
                title: tool.title,
                href: `/tools/${tool.slug}`,
              }}
            />
          </div>

          <div className="print:hidden">
            <ProfessionalNote />
          </div>
        </div>
      ) : null}
    </div>
  );
}
