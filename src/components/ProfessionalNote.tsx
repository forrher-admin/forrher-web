type ProfessionalNoteProps = {
  className?: string;
};

export function ProfessionalNote({ className = "" }: ProfessionalNoteProps) {
  // PLACEHOLDER: replace with ForrHer-approved content
  return (
    <aside
      className={`rounded-2xl border border-border bg-sage/40 px-5 py-5 text-base text-muted ${className}`}
      aria-label="When to see a professional"
    >
      <p className="font-medium text-text">When to see a professional</p>
      <p className="mt-2">
        If pain is severe, bleeding feels unusual for you, or something does not
        feel right, please speak with a qualified health professional. ForrHer
        shares general information only.
      </p>
    </aside>
  );
}
