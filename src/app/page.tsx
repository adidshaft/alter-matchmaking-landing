"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, HeartHandshake, Shield, Sparkles, Network, Plus } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { ThemeToggle } from "@/components/theme-toggle";

const agentLogs = [
  "Agent 004 rejected a match: Vibe mismatch.",
  "Agent 092 found a 98% Vedic harmony.",
  "Agent 011 negotiating boundaries on nightlife.",
  "Agent 077 analyzing a new profile's aesthetic.",
  "Agent 042 shortlisted a potential match for tomorrow.",
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-hidden transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center glass border-b-0 rounded-none bg-black/5 dark:bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-light.png"
            alt="Alter Logo"
            width={40}
            height={40}
            className="rounded-xl drop-shadow-[0_0_10px_rgba(255,191,51,0.5)] dark:hidden block"
          />
          <Image
            src="/images/logo-dark.png"
            alt="Alter Logo"
            width={40}
            height={40}
            className="rounded-xl drop-shadow-[0_0_10px_rgba(115,69,230,0.5)] hidden dark:block"
          />
          <span className="font-bold text-xl tracking-tight">Alter</span>
        </div>
        <ThemeToggle />
      </nav>

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center">

          {/* Framer Motion Pulsing Orb */}
          <motion.div
            style={{ y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40 z-0"
          >
            <div className="absolute inset-0 rounded-full bg-alter-purple blur-[100px] mix-blend-screen animate-pulse duration-3000"></div>
            <div className="absolute inset-20 rounded-full bg-alter-lightpurple blur-[80px] mix-blend-screen opacity-50"></div>
          </motion.div>

          <div className="relative z-10 max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="px-4 py-1.5 rounded-full border border-alter-purple/30 bg-alter-purple/10 text-alter-lightpurple text-sm font-medium tracking-wide mb-6 inline-block">
                iOS Exclusive
              </span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60">
                Stop swiping. Let your <span className="text-alter-purple dark:text-alter-lightpurple">Agent</span> do the scouting.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-black/50 dark:text-white/50 max-w-2xl mx-auto"
            >
              The AI matchmaking app for those who are tired of the game. Your Agent goes out into the wild to find people who fit you perfectly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="h-[50px] w-auto"
                />
              </a>
              <div className="flex w-full sm:w-auto relative max-w-xs">
                <input
                  type="email"
                  placeholder="Join the Waitlist..."
                  className="w-full px-6 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 focus:outline-none focus:border-alter-purple transition-colors"
                />
                <button className="absolute right-2 top-2 bottom-2 p-2 bg-alter-purple rounded-full hover:bg-alter-lightpurple transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Scout Marquee */}
        <section className="py-20 overflow-hidden relative border-y border-white/5 mb-32 -mx-6 px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)] z-10 w-full pointer-events-none"></div>
          <div className="flex gap-4 font-mono text-sm tracking-wider w-max animate-marquee">
            {/* Double the logs for seamless looping */}
            {[...agentLogs, ...agentLogs, ...agentLogs].map((log, i) => {
              const isMatch = log.includes("harmony") || log.includes("shortlisted");
              const isReject = log.includes("rejected");
              const color = isMatch ? 'text-alter-green' : isReject ? 'text-alter-red' : 'text-alter-amber';

              return (
                <div key={i} className="flex items-center gap-3 px-8 text-black/60 dark:text-white/60 whitespace-nowrap">
                  <span className="text-black/20 dark:text-white/20">&gt;</span>
                  <span className={`${color} w-2 h-2 rounded-full animate-pulse`}></span>
                  <span>{log}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Feature Bento Box */}
        <section className="mb-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">How Alter Works</h2>
            <p className="text-black/50 dark:text-white/50 text-lg">Intuitive, precise, and completely hands-off.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Audio Interview Card (Span 2 cols on tablet/large screens) */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 md:col-span-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-alter-lightpurple/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-alter-lightpurple/20 transition-colors"></div>
              <Sparkles className="w-10 h-10 text-alter-purple mb-6" />
              <h3 className="text-2xl font-semibold mb-3">The Audio Interview</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-md">
                No bios to write. Simply talk to your AI in a natural, voice-first interview. The system learns your essence, your tone, and what truly matters to you.
              </p>
            </motion.div>

            {/* AI Dossier */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-alter-amber/10 rounded-full blur-[40px] group-hover:bg-alter-amber/20 transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-alter-amber/10 dark:bg-alter-amber/20 flex items-center justify-center text-alter-amber mb-6 font-mono text-sm border border-alter-amber/30">
                {`{}`}
              </div>
              <h3 className="text-xl font-semibold mb-3">The AI Dossier</h3>
              <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                Your voice and photos are transformed into a high-dimensional persona. This encrypted dossier represents you in the matchmaking ecosystem.
              </p>
            </motion.div>

            {/* 11:11 PM Ritual */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group md:col-span-3 min-h-[300px] flex flex-col md:flex-row items-center gap-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-alter-purple/5 to-transparent"></div>
              <div className="flex-1 relative z-10">
                <HeartHandshake className="w-10 h-10 text-alter-green mb-6" />
                <h3 className="text-3xl font-semibold mb-4">The 11:11 PM Ritual</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed max-w-2xl">
                  Every night at exactly 11:11 PM, the matching engine activates. Agents negotiate based on your strict boundaries and deep preferences. If a perfect harmony is found, you wake up to a curated match.
                </p>
              </div>

              {/* Visual Representation of two agents */}
              <div className="flex-shrink-0 flex items-center gap-4 relative z-10 w-full md:w-auto justify-center">
                <div className="w-20 h-20 rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center font-mono text-black/50 dark:text-white/40">YOU</div>
                <div className="w-12 h-[1px] bg-gradient-to-r from-alter-purple/0 via-alter-purple to-alter-purple/0 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-alter-purple rounded-full blur-[2px]"></div>
                </div>
                <div className="w-20 h-20 rounded-full border border-alter-green/30 bg-alter-green/10 backdrop-blur-sm flex items-center justify-center font-mono text-alter-green">THEM</div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Privacy Section */}
        <section className="text-center max-w-2xl mx-auto py-20 pb-32">
          <Shield className="w-12 h-12 mx-auto text-black/30 dark:text-white/30 mb-6" />
          <h2 className="text-3xl font-semibold mb-6">Designed for Privacy & Intuition</h2>
          <p className="text-black/50 dark:text-white/50 text-lg leading-relaxed">
            Alter only does what is needed. Your data stays strictly between you and your Agent. No swiping. No public profiles. No meaningless small talk. Just deep, verified connections delivered when the time is right.
          </p>
        </section>

        {/* The Vision Tease: Beyond Romance */}
        <section className="mb-40 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-alter-purple/5 to-transparent rounded-[3rem] -z-10"></div>

          <div className="glass rounded-[3rem] p-8 md:p-16 border border-black/10 dark:border-white/10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-alter-purple to-transparent opacity-50"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-alter-lightpurple/20 blur-[100px] rounded-full"></div>

            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 text-sm font-medium mb-8">
                <Network size={14} className="text-alter-purple" />
                The Future of Connection
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Not just for <span className="text-transparent bg-clip-text bg-gradient-to-r from-alter-purple to-alter-lightpurple">romance</span>.
              </h2>

              <p className="text-black/60 dark:text-white/60 text-lg md:text-xl leading-relaxed mb-10">
                While Alter is currently optimized for finding your life partner, the underlying matching engine is built to understand human connection. Soon, your Agent will be able to scout for friends, co-founders, and collaborators with the same precision.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-40 relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How it works.</h2>
            <p className="text-black/50 dark:text-white/50 text-lg">Common questions about the Alter experience.</p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group glass rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden open:border-alter-purple/30 transition-colors duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg hover:text-alter-purple transition-colors">
                Is my data actually private?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                Yes. Unlike traditional apps that host public profiles for the world to see, Alter has zero public-facing content. Your highly personal onboarding and interactions are processed securely on your device. The global network only exchanges encrypted representations of your &quot;vibe&quot;.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group glass rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden open:border-alter-purple/30 transition-colors duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg hover:text-alter-purple transition-colors">
                Do I have to chat with an AI every day?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                Only once. During onboarding, you spend 5 minutes speaking to the AI so it can learn your personality, tone, and dealbreakers. After that, your Agent goes into the wild and scouts for you in the background. You only open the app when a highly compatible human match is found.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group glass rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden open:border-alter-purple/30 transition-colors duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg hover:text-alter-purple transition-colors">
                How does the compatibility matching actually work?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                The Alter Matchmaker uses a proprietary orchestration model. We fuse high-dimensional semantic analysis (personality, aesthetics, tone) with deep relational algorithms. The exact weighting mechanism is continuously learning based on what makes a successful, long-lasting connection.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-8">Ready to stop swiping?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/images/app-store-badge.svg"
                alt="Download on the App Store"
                width={150}
                height={50}
                className="h-[50px] w-auto"
              />
            </a>
            <div className="flex w-full sm:w-auto relative max-w-xs">
              <input
                type="email"
                placeholder="Join the Waitlist..."
                className="w-full px-6 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 focus:outline-none focus:border-alter-purple transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 p-2 bg-alter-purple rounded-full hover:bg-alter-lightpurple transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/5 py-10 text-center text-black/40 dark:text-white/30 text-sm font-mono">
        <p>© 2026 Alter Matchmaking. iOS Exclusive.</p>
      </footer>
    </div>
  );
}
