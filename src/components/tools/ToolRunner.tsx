"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SaveItemButton } from "@/components/SaveItemButton";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { SoftPanel } from "@/components/ui/SoftPanel";
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
        <p className="text-sm font-medium tracking-[0.12em] text-gold uppercase">
          ForrHer Tools
        </p>
        <h1 className="mt-2 font-heading text-3xl text-mocha sm:text-4xl">
          {tool.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{tool.intro}</p>
      </div>

      {!finished && step ? (
        <SoftPanel className="bg-surface">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Step {stepIndex + 1} of {tool.steps.length}
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
                    className={`forrher-press flex min-h-11 w-full items-center rounded-xl border px-4 text-left text-base transition-colors ${
                      selected
                        ? "border-mocha bg-cream text-text"
                        : "border-border bg-cream/40 text-text hover:border-gold hover:bg-cream"
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
              className="forrher-press mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-mocha px-5 text-base text-on-primary hover:bg-primary-hover disabled:opacity-50"
            >
              Continue
            </button>
          ) : null}
        </SoftPanel>
      ) : null}

      {finished ? (
        <div className="space-y-6">
          <SoftPanel className="bg-cream print:border-0 print:bg-transparent print:p-0">
            <h2 className="font-heading text-2xl text-text">{tool.resultTitle}</h2>
            <p className="mt-2 text-base text-muted">{tool.resultIntro}</p>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-base text-text">
              {resultLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </SoftPanel>

          {tool.learnLinks.length > 0 ? (
            <section>
              <h3 className="font-heading text-xl text-text">Related links</h3>
              <ul className="mt-3 space-y-2">
                {tool.learnLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-mocha underline underline-offset-4"
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
              className="forrher-press inline-flex min-h-11 items-center justify-center rounded-xl bg-mocha px-4 text-base text-on-primary hover:bg-primary-hover"
            >
              Print or save as PDF
            </button>
            <button
              type="button"
              onClick={restart}
              className="forrher-press inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-base text-text hover:bg-cream"
            >
              Start again
            </button>
            <Link
              href="/tools"
              className="forrher-press inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-base text-text hover:bg-cream"
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
