type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
};

export function PageShell({
  children,
  className = "",
  narrow = false,
}: PageShellProps) {
  return (
    <div
      className={`mx-auto px-4 py-14 sm:px-6 sm:py-16 ${
        narrow ? "max-w-2xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}
