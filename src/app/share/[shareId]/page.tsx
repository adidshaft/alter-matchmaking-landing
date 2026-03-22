import { Metadata } from "next";
import { notFound } from "next/navigation";
import SharePageClient from "./SharePageClient";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alter.kyokasuigetsu.xyz";

interface PersonaSnapshot {
  full_name: string;
  archetype_name: string | null;
  archetype_emoji: string | null;
  vibe_keywords: string[];
  character_and_habits?: string | null;
  communication_style?: string | null;
  social_battery?: string | null;
  love_languages_observed?: string | null;
  core_values?: string | null;
  lifestyle_and_routine?: string | null;
  agent_strategy: string | null;
  relationship_intention_summary: string | null;
  attachment_notes: string | null;
  zodiac_sign: string | null;
  zodiac_emoji: string | null;
  aesthetic_vibe: string | null;
  connection_mode: string | null;
}

interface ShareData {
  share_id: string;
  snapshot: PersonaSnapshot;
  friend_rating_count: number;
  is_expired: boolean;
  expires_at: string;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareId: string }>;
}): Promise<Metadata> {
  const { shareId } = await params;
  const share = await fetchShare(shareId);
  const shareUrl = `${SITE_URL}/share/${shareId}`;
  const imageUrl = `${SITE_URL}/share/${shareId}/opengraph-image`;

  if (!share) {
    return {
      metadataBase: new URL(SITE_URL),
      title: "Alter — Persona Share",
      description: "See how Alter reads someone and leave your take.",
      openGraph: {
        title: "Alter — Persona Share",
        description: "See how Alter reads someone and leave your take.",
        type: "website",
        url: shareUrl,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: "Alter Persona Share" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Alter — Persona Share",
        description: "See how Alter reads someone and leave your take.",
        images: [imageUrl],
      },
    };
  }

  const { snapshot } = share;
  const name = snapshot.full_name ?? "Someone";
  const archetype = snapshot.archetype_name ?? "a unique persona";
  const emoji = snapshot.archetype_emoji ?? "✨";

  const title = `Is Alter right about ${name}? Help them find out.`;
  const description = `Alter's AI profiled ${name} as ${emoji} ${archetype}. Do you know ${name} better than the AI does? Give your take — it only takes 30 seconds.`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: shareUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Alter persona share for ${name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const share = await fetchShare(shareId);

  if (!share) {
    notFound();
  }

  return (
    <SharePageClient
      shareId={share.share_id}
      snapshot={share.snapshot}
      friendRatingCount={share.friend_rating_count}
      isExpired={share.is_expired}
    />
  );
}
