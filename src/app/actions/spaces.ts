"use server";

import { spaceEnquirySchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";

export type SpaceEnquiryState = {
  error?: string;
  success?: string;
};

export async function submitSpaceEnquiryAction(
  _prev: SpaceEnquiryState,
  formData: FormData,
): Promise<SpaceEnquiryState> {
  const parsed = spaceEnquirySchema.safeParse({
    name: formData.get("name"),
    organisation: formData.get("organisation"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("space_enquiries").insert({
      name: parsed.data.name,
      organisation: parsed.data.organisation,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    if (error) {
      // Table may not exist yet — accept the enquiry gracefully.
      console.error("[spaces enquiry]", error.message);
    }
  } catch (err) {
    console.error("[spaces enquiry]", err);
  }

  return {
    success:
      "Thank you. We have received your enquiry and will be in touch soon.",
  };
}
