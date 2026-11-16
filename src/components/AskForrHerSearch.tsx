export function AskForrHerSearch() {
  return (
    <form
      action="/today"
      method="get"
      className="rounded-xl border border-border bg-surface p-1.5"
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
          className="min-h-11 w-full flex-1 rounded-lg border-0 bg-transparent px-3.5 text-base text-text placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="forrher-press inline-flex min-h-11 items-center justify-center rounded-lg bg-mocha px-5 text-base text-on-primary hover:bg-primary-hover"
        >
          Ask
        </button>
      </div>
    </form>
  );
}
