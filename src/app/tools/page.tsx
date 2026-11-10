import { ComingTogether } from "@/components/ComingTogether";
import { ProfessionalNote } from "@/components/ProfessionalNote";

export const metadata = {
  title: "Tools",
  description: "Practical checklists and plans for real days.",
};

export default function ToolsPage() {
  return (
    <>
      <ComingTogether
        title="ForrHer Tools"
        description="Practical tools for period days, workdays, and doctor visits are coming together."
      />
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
        <ProfessionalNote />
      </div>
    </>
  );
}
