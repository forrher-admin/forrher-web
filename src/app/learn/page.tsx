import { ComingTogether } from "@/components/ComingTogether";
import { ProfessionalNote } from "@/components/ProfessionalNote";

export const metadata = {
  title: "Learn",
  description: "Clear women's health articles in plain language.",
};

export default function LearnPage() {
  return (
    <>
      <ComingTogether
        title="ForrHer Learn"
        description="Articles and gentle explanations are coming together here."
      />
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
        <ProfessionalNote />
      </div>
    </>
  );
}
