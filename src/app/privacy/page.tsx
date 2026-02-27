import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-alter-purple/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-alter-gold/[0.04] rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-alter-purple/[0.03] rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-14 pt-32 pb-32">

                {/* Navigation / Back */}
                <div className="mb-16">
                    <Link href="/" className="text-white/40 hover:text-white transition-colors font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
                        <span>←</span> Return
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-white/[0.12]" />
                        <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">The Covenant</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight text-white mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">Effective Date: October 2026</p>
                </div>

                {/* Content Body */}
                <article className="prose prose-invert prose-p:text-white/60 prose-p:font-sans prose-p:leading-relaxed prose-headings:font-serif prose-headings:italic prose-headings:font-normal prose-headings:text-white prose-li:text-white/60 max-w-none">

                    <h2 className="text-2xl mt-16 mb-6">1. Introduction</h2>
                    <p>
                        Welcome to Alter. This Privacy Policy outlines how we collect, use, process, and protect your personal data when you use the Alter iOS application and related services.
                    </p>
                    <p>
                        Alter is radically different from traditional matchmaking apps. It is built on a private, autonomous agent architecture (the "Digital Soul"). Because your agent learns from you to negotiate matches on your behalf, we process sensitive psychological and behavioral signals.
                    </p>
                    <p>
                        Our core privacy tenet is this: <strong>We do not build a public profile for you to be browsed by others, and we do not monetize your data through advertising.</strong> Your data is used exclusively to train your agent and find your matches.
                    </p>

                    <h2 className="text-2xl mt-16 mb-6">2. What We Collect and Why</h2>
                    <p>We collect only what is necessary to operate your agent and deliver matches. Here is every category:</p>

                    <h3 className="text-lg text-alter-gold/90 mt-8 mb-4">Account Information</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>Your name and email address, collected when you create an account.</li>
                        <li>Used to identify your account and send you service notifications (e.g. your 11:11 PM match alert).</li>
                    </ul>

                    <h3 className="text-lg text-alter-gold/90 mt-8 mb-4">Voice Interview</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>Audio recordings made during your onboarding interview with your agent.</li>
                        <li>These recordings are processed by our AI pipeline to extract personality signals, communication patterns, and the fields that power your agent (attachment style, values, relationship intention, etc.).</li>
                        <li>Raw audio is not permanently retained after processing is complete. What remains is a structured agent summary — not a recording you can play back.</li>
                    </ul>

                    <h3 className="text-lg text-alter-gold/90 mt-8 mb-4">Photos</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>Up to 10 photos you choose to upload during onboarding.</li>
                        <li>Photos are analysed for visual and contextual signals that inform your agent's understanding of you (energy, aesthetic, lifestyle context). They are not displayed in a public gallery. Other users do not browse your photos.</li>
                    </ul>

                    <h3 className="text-lg text-alter-gold/90 mt-8 mb-4">Location</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>Approximate location (city-level). We do not collect or store precise GPS coordinates.</li>
                        <li>Used exclusively for the soft gravity matching system — to weight matches toward people in a similar location without hard-cutting anyone outside a radius.</li>
                    </ul>

                    <h3 className="text-lg text-alter-gold/90 mt-8 mb-4">Messages & Agent Feedback</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>Chat messages you exchange with your matches inside the app are stored to power the conversation feature and run our automated safety monitoring layer. Message content is not used for advertising and is not shared with third parties.</li>
                        <li>Your reactions to matches (ratings, reason chips, Memory Vault entries) are used exclusively to improve your agent's accuracy over time.</li>
                    </ul>

                    <h2 className="text-2xl mt-16 mb-6">3. What We Do Not Collect</h2>
                    <p>To be explicit:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>We do not collect your contacts, calendar, or any data from other apps.</li>
                        <li>We do not collect precise GPS coordinates.</li>
                        <li>We do not collect financial information. Any payments are processed by Apple's App Store system — we never see your card details.</li>
                        <li>We do not collect health or biometric data.</li>
                        <li>We do not collect browsing history or search history from outside the app.</li>
                        <li>We do not track you across other websites or apps.</li>
                    </ul>

                    <h2 className="text-2xl mt-16 mb-6">4. Your Agent and Your Data</h2>
                    <p>
                        This section is the most important one for understanding how Alter works differently from other services.
                    </p>
                    <p>
                        Nothing you share is stored as a raw public profile visible to other users. Your agent learns from what you tell it and maintains a private structured summary. That summary is used only to find and evaluate matches on your behalf.
                    </p>
                    <p>
                        Specifically: your voice interview content, your photos, your Memory Vault entries, and your feedback signals are processed to build and continuously refine your agent's understanding of you. This understanding lives in your agent — not in a profile that other users can browse.
                        When your agent negotiates with another user's agent during the matching process, it does so using a structured representation of your compatibility — not by sharing your raw personal data with the other user.
                    </p>

                    <h2 className="text-2xl mt-16 mb-6">5. How We Share Your Data</h2>
                    <p>
                        We do not sell your personal data. We do not share your personal data with advertisers. The following are the only circumstances in which your data may be shared:
                    </p>
                    <ul className="list-disc pl-5 space-y-4 mb-8">
                        <li><strong>Third-Party AI and Infrastructure Providers:</strong> Alter uses third-party services to operate. These providers process your data only as instructed by us and only as necessary to deliver the service (e.g. Google Gemini, OpenAI Whisper, Supabase, AWS). All providers operate under data processing agreements.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose data if required by law, a valid court order, or to protect the safety of our users.</li>
                        <li><strong>Business Transfers:</strong> If Alter is acquired or merges with another company, your data may transfer to the acquiring entity.</li>
                    </ul>

                    <h2 className="text-2xl mt-16 mb-6">6. Data Retention</h2>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li>Your account data is retained for as long as your account is active.</li>
                        <li>Raw audio from your voice interview is deleted after AI processing is complete (within 24 hours of your interview session).</li>
                        <li>Your agent summary, Memory Vault contents, and match history are retained until you delete your account.</li>
                        <li>When you delete your account, all personal data associated with your account is permanently deleted within 30 days. This action cannot be undone. You can delete your account at any time from: Settings → Account → Delete Account.</li>
                    </ul>

                    <h2 className="text-2xl mt-16 mb-6">7. Your Rights</h2>
                    <p>Depending on where you are located, you may have the following rights regarding your personal data:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                        <li><strong>Access</strong> — request a copy of the data we hold about you.</li>
                        <li><strong>Correction</strong> — ask us to correct inaccurate data.</li>
                        <li><strong>Deletion</strong> — request that we delete your data.</li>
                        <li><strong>Portability</strong> — request your data in a machine-readable format.</li>
                        <li><strong>Objection & Withdrawal</strong> — object to specific uses of your data, and withdraw consent where applicable.</li>
                    </ul>

                    <h2 className="text-2xl mt-16 mb-6">8. Safety and Security</h2>
                    <p>
                        All data in transit between your device and our servers is encrypted using TLS. Data at rest in our database is encrypted. Access to user data internally is restricted to personnel who require it to operate the service.
                    </p>
                    <p>
                        Alter operates an automated safety layer that monitors messages for harmful, abusive, or threatening content. This system is designed to fail open — meaning that if it encounters an error, it defaults to allowing message delivery rather than blocking it, to prevent false positives from disrupting legitimate conversations.
                    </p>

                    <h2 className="text-2xl mt-16 mb-6">9. Contact</h2>
                    <p>
                        For any privacy-related questions, requests, or concerns, contact us at:
                        <br /><br />
                        <strong>Email:</strong> adidshaft@kyokasuigetsu.xyz<br />
                        <strong>Website:</strong> alter.kyokasuigetsu.xyz
                    </p>

                </article>

                <div className="mt-32 pt-8 border-t border-white/[0.04] text-center">
                    <span className="font-mono tracking-[0.65em] uppercase text-white/50 text-sm">a l t e r</span>
                </div>

            </div>
        </main>
    );
}
