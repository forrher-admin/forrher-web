export const metadata = {
  title: "Privacy",
  description: "How ForrHer handles your information.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-text sm:text-4xl">Privacy</h1>
      <div className="mt-6 space-y-4 text-base text-muted">
        {/* PLACEHOLDER: replace with ForrHer-approved content */}
        <p>
          ForrHer is being built with care for your privacy. We will only ask for
          what we need, keep secrets in secure environments, and never sell your
          personal information.
        </p>
        <p>
          A full privacy notice is coming together. If you have questions in the
          meantime, please use the account deletion request once accounts are
          available, or contact the ForrHer team directly.
        </p>
      </div>
    </section>
  );
}
