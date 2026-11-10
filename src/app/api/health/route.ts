import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getSession();

    if (error) {
      return Response.json(
        { ok: false, error: "Unable to reach Supabase" },
        { status: 503 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Supabase configuration or connection failed" },
      { status: 503 },
    );
  }
}
