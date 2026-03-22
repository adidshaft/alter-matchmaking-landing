"use client";

import { useState, useRef, useEffect } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const APP_STORE_URL =
  "https://apps.apple.com/app/alter/id6743469697?utm_source=viral_share&utm_medium=friend_rating&utm_campaign=persona_share";

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

interface Props {
  shareId: string;
  snapshot: PersonaSnapshot;
  friendRatingCount: number;
  isExpired: boolean;
}

type Step = "view" | "rating" | "auth" | "submitting" | "done";

export default function SharePageClient({
  shareId,
  snapshot,
  friendRatingCount: initialCount,
  isExpired,
}: Props) {
  const [step, setStep] = useState<Step>("view");
  const [selectedRating, setSelectedRating] = useState<"spot_on" | "can_improve" | null>(null);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [authMode, setAuthMode] = useState<"apple" | "email">("apple");
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [ratingCount, setRatingCount] = useState(initialCount);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  function handleRatingSelect(r: "spot_on" | "can_improve") {
    setSelectedRating(r);
    setStep("rating");
    setTimeout(() => commentRef.current?.focus(), 200);
  }

  function handleCommentFocus() {
    if (step === "rating" && comment.trim().length >= 0) {
      setStep("auth");
    }
  }

  function handleAppleSignIn() {
    const AppleID = (window as unknown as Record<string, unknown>).AppleID as {
      auth: {
        init: (cfg: Record<string, string>) => void;
        signIn: () => Promise<{ authorization: { id_token: string; state: string } }>;
      };
    } | undefined;

    if (!AppleID) {
      setError("Apple Sign-In is not available in this browser. Please try the email option.");
      return;
    }

    const nonce = crypto.randomUUID().replace(/-/g, "");
    const origin = window.location.origin;

    AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_SERVICE_ID ?? "com.adidshaft.alter.web",
      scope: "name email",
      redirectURI: `${origin}/share/${shareId}`,
      state: nonce,
      usePopup: "true",
    });

    AppleID.auth.signIn().then(async (resp) => {
      const idToken = resp.authorization.id_token;
      await submitRating(idToken, nonce);
    }).catch((err: unknown) => {
      console.error("Apple Sign-In failed", err);
      setError("Sign-in was cancelled or failed. Please try again.");
      setStep("auth");
    });
  }

  async function handleEmailAuth() {
    if (!email.trim()) return;
    setStep("submitting");

    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          email: email.trim(),
          create_user: true,
          options: { emailRedirectTo: `${window.location.origin}/share/${shareId}?submit=1` },
        }),
      });

      if (!res.ok) throw new Error("Failed to send email link");

      setIsNewUser(false);
      setStep("done");
    } catch {
      setError("Could not send email link. Please try Apple Sign-In.");
      setStep("auth");
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const submit = params.get("submit");
    if (submit !== "1") return;

    const hash = window.location.hash;
    if (!hash) return;
    const hashParams = new URLSearchParams(hash.slice(1));
    const accessToken = hashParams.get("access_token");
    if (!accessToken) return;

    handleEmailTokenSubmit(accessToken);
  }, []);

  async function handleEmailTokenSubmit(accessToken: string) {
    setStep("submitting");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-friend-rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          share_id: shareId,
          rating: selectedRating ?? "spot_on",
          comment: comment.trim() || undefined,
          apple_id_token: accessToken,
          nonce: "email_otp_bypass",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setIsNewUser(data.is_new_user ?? false);
      setRatingCount((c) => c + 1);
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("auth");
    }
  }

  async function submitRating(appleIdToken: string, nonce: string) {
    setStep("submitting");
    setError(null);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-friend-rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          share_id: shareId,
          rating: selectedRating,
          comment: comment.trim() || undefined,
          apple_id_token: appleIdToken,
          nonce,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");

      setIsNewUser(data.is_new_user ?? false);
      setRatingCount((c) => c + 1);
      setStep("done");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setStep("auth");
    }
  }

  const name = snapshot.full_name ?? "Someone";

  if (step === "done") {
    return (
      <PageShell>
        <div className="flex flex-col items-center gap-6 py-12 text-center">
          <div className="text-6xl">
            {selectedRating === "spot_on" ? "🎯" : selectedRating === "can_improve" ? "💬" : "📬"}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {selectedRating
              ? `${name}'s AI just got smarter — thanks to you.`
              : "Check your email for a sign-in link!"}
          </h2>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            {selectedRating
              ? `Alter will use your take to refine ${name}'s persona. ${name} has been notified.`
              : "Once you click it, your rating will be saved automatically."}
          </p>

          <div className="mt-4 w-full max-w-sm rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 text-left">
            <p className="text-sm font-semibold text-purple-300 mb-1">Curious about your own read?</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              You know {name} better than the AI does. But does the AI already know <em>you</em>? It
              takes 2 minutes to find out.
            </p>
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-zinc-100 active:scale-95"
            >
              <span>🌀</span> Try Alter Free
            </a>
            <p className="mt-2 text-xs text-zinc-500">iOS · No swiping. No looks-first. Just fit.</p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
        <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">Alter</span>
      </div>

      <h1 className="font-serif text-[28px] text-white leading-snug mb-1">
        Is the AI right about <span className="text-purple-300">{name}</span>?
      </h1>
      <p className="text-sm text-zinc-400 mb-5">
        {name} shared their AI persona with you. Your take helps Alter find them a better match.
      </p>

      {ratingCount > 0 && (
        <div className="mb-5 text-xs text-zinc-500">
          <span className="text-purple-400 font-semibold">{ratingCount}</span>{" "}
          {ratingCount === 1 ? "friend" : "friends"} already shared their read
        </div>
      )}

      <DossierCard snapshot={snapshot} />

      {isExpired ? (
        <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5 text-center">
          <p className="text-zinc-400 text-sm">This share link has expired.</p>
        </div>
      ) : (
        <>
          <div className="mt-7 mb-4">
            <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-3">
              Your take
            </p>
            <div className="flex gap-3">
              <RatingButton
                selected={selectedRating === "spot_on"}
                onClick={() => handleRatingSelect("spot_on")}
                emoji="🎯"
                label="Spot On"
                sublabel="The AI nailed it"
              />
              <RatingButton
                selected={selectedRating === "can_improve"}
                onClick={() => handleRatingSelect("can_improve")}
                emoji="🤔"
                label="Could be better"
                sublabel="I know them differently"
              />
            </div>
          </div>

          {(step === "rating" || step === "auth") && (
            <div className="mt-2 mb-4 transition-all">
              <label className="block text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-2">
                Leave a note for Alter
              </label>
              <textarea
                ref={commentRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={handleCommentFocus}
                rows={3}
                placeholder={
                  selectedRating === "spot_on"
                    ? `E.g. "${name} is definitely more adventurous than this…"`
                    : `E.g. "${name} is actually super introverted, this doesn't capture that."`
                }
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          )}

          {step === "auth" && (
            <AuthWall
              authMode={authMode}
              email={email}
              error={error}
              onAppleSignIn={handleAppleSignIn}
              onEmailChange={setEmail}
              onEmailSubmit={handleEmailAuth}
              onSwitchMode={(m) => setAuthMode(m)}
            />
          )}

          {step === "submitting" && (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
            </div>
          )}
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" />
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0614] flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

function cleanText(value?: string | null): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned : null;
}

function DossierCard({ snapshot }: { snapshot: PersonaSnapshot }) {
  const keywords = (snapshot.vibe_keywords ?? [])
    .map((keyword) => cleanText(keyword))
    .filter((keyword): keyword is string => Boolean(keyword))
    .slice(0, 5);
  const archetypeName = cleanText(snapshot.archetype_name);
  const archetypeEmoji = cleanText(snapshot.archetype_emoji);
  const aestheticVibe = cleanText(snapshot.aesthetic_vibe);
  const characterAndHabits = cleanText(snapshot.character_and_habits);
  const agentStrategy = cleanText(snapshot.agent_strategy);
  const zodiacSign = cleanText(snapshot.zodiac_sign);
  const zodiacEmoji = cleanText(snapshot.zodiac_emoji);
  const connectionMode = cleanText(snapshot.connection_mode);
  const portfolioTraits = [
    { title: "Communication style", text: cleanText(snapshot.communication_style) },
    { title: "Social battery", text: cleanText(snapshot.social_battery) },
    { title: "Love languages observed", text: cleanText(snapshot.love_languages_observed) },
    { title: "Core values", text: cleanText(snapshot.core_values) },
    { title: "Lifestyle and routine", text: cleanText(snapshot.lifestyle_and_routine) },
  ].filter((item) => Boolean(item.text));
  const hasNarrativeRead = Boolean(characterAndHabits || portfolioTraits.length > 0 || agentStrategy);

  return (
    <div className="rounded-2xl border border-purple-500/20 bg-purple-950/30 backdrop-blur p-5">
      {archetypeEmoji && archetypeName ? (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{archetypeEmoji}</span>
          <div>
            <p className="font-serif text-[22px] text-white leading-tight">{archetypeName}</p>
            {aestheticVibe && (
              <p className="text-xs text-purple-300">{aestheticVibe}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
          <p className="font-serif text-[20px] text-white leading-tight">Alter Persona</p>
          <p className="mt-1 text-sm text-zinc-400">
            {aestheticVibe ?? (connectionMode ? `${connectionMode} mode read` : "A live read that gets sharper with feedback")}
          </p>
        </div>
      )}

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {characterAndHabits && (
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-2">
            Who they are
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-purple-500/30 pl-3 py-0.5">
            {characterAndHabits}
          </p>
        </div>
      )}

      {portfolioTraits.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-2">
            Personality portfolio
          </p>
          <div className="grid gap-3">
            {portfolioTraits.map((trait) => (
              <div
                key={trait.title}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300/80">
                  {trait.title}
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {trait.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {portfolioTraits.length === 0 && hasNarrativeRead && (
        <div className="mb-4 rounded-xl border border-dashed border-white/10 bg-black/10 px-4 py-3">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-1">
            Personality portfolio
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            The deeper portfolio is still taking shape. A little more interview detail and friend feedback will sharpen how Alter describes their communication style, values, and social rhythm.
          </p>
        </div>
      )}

      {agentStrategy && (
        <div className="mb-3">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-1">
            The Match Fit
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">{agentStrategy}</p>
        </div>
      )}

      {!hasNarrativeRead && (
        <p className="text-sm leading-relaxed text-zinc-400">
          Alter has the outline, but this read is still getting more specific as more interview detail comes in.
        </p>
      )}

      {zodiacEmoji && zodiacSign && (
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
          <span>{zodiacEmoji}</span>
          <span>{zodiacSign}</span>
        </div>
      )}
    </div>
  );
}

function RatingButton({
  selected,
  onClick,
  emoji,
  label,
  sublabel,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  sublabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1.5 rounded-2xl border py-4 px-3 text-center transition-all active:scale-95 ${selected
          ? "border-purple-500 bg-purple-500/15 ring-1 ring-purple-500"
          : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500"
        }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="text-[11px] text-zinc-500">{sublabel}</span>
    </button>
  );
}

function AuthWall({
  authMode,
  email,
  error,
  onAppleSignIn,
  onEmailChange,
  onEmailSubmit,
  onSwitchMode,
}: {
  authMode: "apple" | "email";
  email: string;
  error: string | null;
  onAppleSignIn: () => void;
  onEmailChange: (v: string) => void;
  onEmailSubmit: () => void;
  onSwitchMode: (m: "apple" | "email") => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-3xl border border-zinc-800 bg-[#0d0a18] p-5 shadow-2xl shadow-black/40">
      <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-700" />

      <h3 className="text-lg font-bold text-white mb-1">Sign in to submit</h3>
      <p className="text-sm text-zinc-400 mb-4">
        Alter only accepts ratings from real people so one person can't spam the read.
      </p>

      <div className="mb-4 flex gap-2 rounded-full bg-zinc-900 p-1">
        <button
          onClick={() => onSwitchMode("apple")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${authMode === "apple"
              ? "bg-white text-black"
              : "text-zinc-400"
            }`}
        >
          Apple
        </button>
        <button
          onClick={() => onSwitchMode("email")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${authMode === "email"
              ? "bg-white text-black"
              : "text-zinc-400"
            }`}
        >
          Email
        </button>
      </div>

      {authMode === "apple" ? (
        <button
          onClick={onAppleSignIn}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-100 active:scale-[0.99]"
        >
          Continue with Apple
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={onEmailSubmit}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-100 active:scale-[0.99]"
          >
            Email me a sign-in link
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
