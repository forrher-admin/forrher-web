export function AskForrHerSearch() {
  return (
    <form
      action="/today"
      method="get"
      className="rounded-2xl border border-border/80 bg-surface/95 p-2 shadow-[0_16px_40px_rgba(74,44,42,0.06)] backdrop-blur-sm"
      role="search"
      aria-label="Ask ForrHer"
    >
      <label htmlFor="ask-forrher" className="sr-only">
        Ask ForrHer
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          id="ask-forrher"
          name="q"
          type="search"
          placeholder="Ask ForrHer anything…"
          className="min-h-11 w-full flex-1 rounded-xl border-0 bg-transparent px-4 text-base text-text placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-base text-surface transition-colors hover:bg-primary-hover"
        >
          Ask
        </button>
      </div>
    </form>
  );
}
