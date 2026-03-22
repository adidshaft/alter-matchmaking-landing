import { ImageResponse } from "next/og";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface PersonaSnapshot {
  full_name: string;
  archetype_name: string | null;
  archetype_emoji: string | null;
  vibe_keywords: string[];
  communication_style?: string | null;
  core_values?: string | null;
}

interface ShareData {
  snapshot: PersonaSnapshot;
}

async function fetchShare(shareId: string): Promise<ShareData | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/get-persona-share?share_id=${encodeURIComponent(shareId)}`,
      {
        headers: { apikey: SUPABASE_ANON_KEY },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function cleanText(value?: string | null): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned || null;
}

function trimPreview(value?: string | null, max = 170): string | null {
  const cleaned = cleanText(value);
  if (!cleaned) return null;
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const share = await fetchShare(shareId);
  const snapshot = share?.snapshot;

  const name = cleanText(snapshot?.full_name) ?? "Someone";
  const archetype = cleanText(snapshot?.archetype_name) ?? "Persona Share";
  const emoji = cleanText(snapshot?.archetype_emoji) ?? "✨";
  const keywords = (snapshot?.vibe_keywords ?? [])
    .map((keyword) => cleanText(keyword))
    .filter((keyword): keyword is string => Boolean(keyword))
    .slice(0, 3);
  const portfolioLine =
    trimPreview(snapshot?.communication_style, 140) ??
    trimPreview(snapshot?.core_values, 140) ??
    "A friend-facing personality portfolio shaped by Alter's read.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #090513 0%, #160927 45%, #25103d 100%)",
          color: "white",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(179,132,255,0.35), transparent 28%), radial-gradient(circle at bottom left, rgba(88,118,255,0.22), transparent 26%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "system-ui, sans-serif",
                fontSize: 24,
                color: "rgba(226, 214, 255, 0.9)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                A
              </div>
              Alter Persona Share
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div style={{ fontSize: 88 }}>{emoji}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div
                  style={{
                    fontSize: 36,
                    lineHeight: 1.1,
                    color: "rgba(237, 230, 255, 0.92)",
                  }}
                >
                  Is Alter right about {name}?
                </div>
                <div
                  style={{
                    fontSize: 68,
                    lineHeight: 1,
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {archetype}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              padding: "28px 30px",
              borderRadius: 28,
              background: "rgba(7, 5, 16, 0.46)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            }}
          >
            {keywords.length > 0 && (
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {keywords.map((keyword) => (
                  <div
                    key={keyword}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 18px",
                      borderRadius: 999,
                      background: "rgba(171, 119, 255, 0.14)",
                      border: "1px solid rgba(190, 155, 255, 0.25)",
                      color: "#ddc7ff",
                      fontSize: 22,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(240, 236, 255, 0.84)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {portfolioLine}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "rgba(212, 203, 232, 0.82)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Friends can rate the read and help Alter sharpen the match fit.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
