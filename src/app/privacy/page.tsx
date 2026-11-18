import Link from "next/link";

export const metadata = {
  title: "Privacy",
  description: "How ForrHer collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-mocha sm:text-4xl">Privacy</h1>
      <p className="mt-3 text-base text-muted">
        Last updated: 18 November 2026. This notice explains how ForrHer handles
        information on forrher.com today.
      </p>

      <div className="mt-8 space-y-8 text-base text-muted">
        <section>
          <h2 className="font-heading text-2xl text-mocha">Our approach</h2>
          <p className="mt-3">
            ForrHer is a women&apos;s health education and daily-support site. We
            only ask for what we need to run the features you use, we do not sell
            personal information, and we do not use third-party advertising
            trackers on the site today.
          </p>
          <p className="mt-3">
            ForrHer is non-diagnostic. Content is general information, not
            personal medical advice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">
            Information we may collect
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-medium text-text">Account details</span> —
              email address and password if you create an account (password is
              handled by our authentication provider, not stored in plain text by
              ForrHer).
            </li>
            <li>
              <span className="font-medium text-text">Saved items</span> — titles
              and links you choose to save while signed in.
            </li>
            <li>
              <span className="font-medium text-text">Spaces enquiries</span> —
              name, organisation, email, and message if you submit the Spaces
              form.
            </li>
            <li>
              <span className="font-medium text-text">
                Technical basics
              </span>{" "}
              — standard server logs needed to keep the site secure and working
              (for example, approximate request timing and error records).
            </li>
          </ul>
          <p className="mt-3">
            We do not currently collect payment card or M-Pesa details on this
            site. When Paystack checkout is enabled, payment data will be handled
            by Paystack under their terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">How we use it</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>To create and secure your account</li>
            <li>To show your saved items only to you</li>
            <li>To respond to Spaces partnership enquiries</li>
            <li>To process account deletion requests</li>
            <li>To keep the website reliable and protected</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">Consent</h2>
          <p className="mt-3">
            Creating an account, saving an item, or sending a Spaces enquiry is
            your consent for ForrHer to process that information for the purposes
            above. You can stop using the site at any time and request deletion
            of your account.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">
            Storage, security, and retention
          </h2>
          <p className="mt-3">
            Account and saved-item data are stored in Supabase (hosted database
            and authentication) with access controls and row-level security
            policies. Secrets such as service keys stay in server environment
            variables and are not exposed to the browser.
          </p>
          <p className="mt-3">
            We keep account and saved-item data while your account is active.
            Spaces enquiries are kept so the ForrHer team can follow up. When an
            account deletion request is completed, we remove or anonymise account
            data we no longer need, unless a short legal or security retention is
            required.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">
            Account deletion
          </h2>
          <p className="mt-3">
            Signed-in users can request deletion from the{" "}
            <Link
              href="/account"
              className="text-mocha underline underline-offset-4"
            >
              Account
            </Link>{" "}
            page by typing DELETE to confirm. Requests are recorded and processed
            by the ForrHer team. Until processing is complete, your request date
            remains visible on your account.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">
            What is not covered yet
          </h2>
          <p className="mt-3">
            Features such as AI-assisted Ask ForrHer conversations, payment
            checkout, email notifications, or analytics will need an updated
            privacy notice, clearer consent where required, and a security review
            before they handle more sensitive information. We will update this
            page before those features go live.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-mocha">Contact</h2>
          <p className="mt-3">
            For privacy questions or deletion help, contact the ForrHer team
            through the channel shared with you by ForrHer, or use the account
            deletion request if you are signed in.
          </p>
        </section>
      </div>
    </section>
  );
}
