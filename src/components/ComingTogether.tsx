type ComingTogetherProps = {
  title: string;
  description?: string;
};

export function ComingTogether({ title, description }: ComingTogetherProps) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg text-muted">
        {description ??
          "This part of ForrHer is coming together. Thank you for your patience."}
      </p>
    </section>
  );
}
