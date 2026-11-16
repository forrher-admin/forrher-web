import { ProfessionalNote } from "@/components/ProfessionalNote";
import { SpacesEnquiryForm } from "@/components/spaces/SpacesEnquiryForm";
import { PageShell } from "@/components/ui/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoftPanel } from "@/components/ui/SoftPanel";

export const metadata = {
  title: "Spaces",
  description:
    "Supportive period-care spaces for workplaces, hotels, and schools.",
};

const audiences = [
  {
    title: "Workplaces",
    body: "Quiet, practical support so people can stay comfortable through the day without fuss or stigma.",
  },
  {
    title: "Hotels",
    body: "Thoughtful amenities for guests who need period care while travelling — calm, discreet, ready.",
  },
  {
    title: "Schools",
    body: "Age-appropriate, respectful setups that help students feel prepared and less alone.",
  },
] as const;

const values = [
  {
    title: "Dignity first",
    body: "Spaces that feel private and kind — never clinical or loud.",
  },
  {
    title: "Practical kits",
    body: "Essentials people actually reach for, presented with care.",
  },
  {
    title: "Clear partnership",
    body: "We help you plan what fits your setting. No jargon, no pressure.",
  },
] as const;

export default function SpacesPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="max-w-3xl">
          <p className="font-heading text-5xl text-mocha sm:text-6xl">
            ForrHer Spaces
          </p>
          <p className="mt-4 text-lg text-muted sm:text-xl">
            Supportive places for period care — designed with workplaces,
            hotels, and schools in mind.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <SectionHeading
          eyebrow="Who it is for"
          title="Built for places people already move through"
          description="ForrHer Spaces is an informational partnership offer — not a social network. We help organisations create calm, practical support on site."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {audiences.map((item) => (
            <li key={item.title}>
              <SoftPanel className="h-full bg-cream/60">
                <h3 className="font-heading text-2xl text-mocha">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-muted">{item.body}</p>
              </SoftPanel>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16">
        <SectionHeading
          eyebrow="What we offer"
          title="Calm value, clear next steps"
        />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <li key={item.title} className="border-t border-border pt-5">
              <h3 className="font-heading text-xl text-mocha">{item.title}</h3>
              <p className="mt-2 text-base text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Enquire"
            title="Tell us about your setting"
            description="Share a little about your organisation. We will follow up with next steps — no obligation."
          />
        </div>
        <SpacesEnquiryForm />
      </Reveal>

      <div className="mt-14 max-w-3xl">
        <ProfessionalNote />
      </div>
    </PageShell>
  );
}
