import { AskForrHerSearch } from "@/components/AskForrHerSearch";
import { FeatureCards } from "@/components/FeatureCards";
import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SituationChips } from "@/components/SituationChips";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f3e6eb_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_#dce6dd_0%,_transparent_45%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-heading text-sm tracking-[0.18em] text-accent uppercase">
            ForrHer
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl text-text sm:text-5xl">
            What would make today easier?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Gentle guidance for the day you are having — no jargon, no pressure.
          </p>

          <div className="mt-10">
            <h2 className="sr-only">Choose a situation</h2>
            <SituationChips />
          </div>

          <div className="mt-8 max-w-2xl">
            <AskForrHerSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-3xl text-text">Explore ForrHer</h2>
        <p className="mt-2 max-w-2xl text-base text-muted">
          Learn, plan, find what you need, or discover a supportive space.
        </p>
        <div className="mt-8">
          <FeatureCards />
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <ProfessionalNote />
        </div>
      </section>
    </div>
  );
}
