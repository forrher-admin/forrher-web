type SoftPanelProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "aside";
};

export function SoftPanel({
  children,
  className = "",
  as: Tag = "div",
}: SoftPanelProps) {
  return (
    <Tag
      className={`rounded-2xl border border-border/80 bg-cream/70 p-5 sm:p-6 ${className}`}
    >
      {children}
    </Tag>
  );
}
