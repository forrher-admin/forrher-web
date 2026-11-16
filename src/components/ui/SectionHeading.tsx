type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-[0.14em] text-gold uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-heading text-3xl text-text sm:text-4xl ${
          eyebrow ? "mt-2" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
