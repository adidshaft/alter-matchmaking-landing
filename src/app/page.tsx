"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Apple, ChevronRight, HeartHandshake, Shield, Sparkles } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

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
    <div className="min-h-screen bg-[var(--background)] text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center glass border-b-0 rounded-none bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Alter Logo"
            width={40}
            height={40}
            className="rounded-xl drop-shadow-[0_0_10px_rgba(115,69,230,0.5)]"
          />
          <span className="font-bold text-xl tracking-tight">Alter</span>
        </div>
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
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                Stop swiping. Let your <span className="text-alter-lightpurple">Agent</span> do the scouting.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto"
            >
              The AI matchmaking app for those who are tired of the game. Your Agent goes out into the wild to find people who fit you perfectly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <Apple size={24} className="-mt-1" fill="currentColor" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium opacity-80">Download on the</span>
                  <span className="text-base font-bold">App Store</span>
                </span>
              </button>
              <div className="flex w-full sm:w-auto relative max-w-xs">
                <input
                  type="email"
                  placeholder="Join the Waitlist..."
                  className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-alter-purple transition-colors"
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
                <div key={i} className="flex items-center gap-3 px-8 text-white/60 whitespace-nowrap">
                  <span className="text-white/20">&gt;</span>
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
            <p className="text-white/50 text-lg">Intuitive, precise, and completely hands-off.</p>
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
              <p className="text-white/60 leading-relaxed max-w-md">
                No bios to write. Simply talk to your AI in a natural, voice-first interview. The system learns your essence, your tone, and what truly matters to you.
              </p>
            </motion.div>

            {/* AI Dossier */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-alter-amber/10 rounded-full blur-[40px] group-hover:bg-alter-amber/20 transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-alter-amber/20 flex items-center justify-center text-alter-amber mb-6 font-mono text-sm border border-alter-amber/30">
                {`{}`}
              </div>
              <h3 className="text-xl font-semibold mb-3">The AI Dossier</h3>
              <p className="text-white/60 text-sm leading-relaxed">
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
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                  Every night at exactly 11:11 PM, the matching engine activates. Agents negotiate based on your strict boundaries and deep preferences. If a perfect harmony is found, you wake up to a curated match.
                </p>
              </div>

              {/* Visual Representation of two agents */}
              <div className="flex-shrink-0 flex items-center gap-4 relative z-10 w-full md:w-auto justify-center">
                <div className="w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center font-mono text-white/40">YOU</div>
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
          <Shield className="w-12 h-12 mx-auto text-white/30 mb-6" />
          <h2 className="text-3xl font-semibold mb-6">Designed for Privacy & Intuition</h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Alter only does what is needed. Your data stays strictly between you and your Agent. No swiping. No public profiles. No meaningless small talk. Just deep, verified connections delivered when the time is right.
          </p>
        </section>
      </main>

      {/* Dark Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-white/30 text-sm font-mono">
        <p>© 2026 Alter Matchmaking. iOS Exclusive.</p>
      </footer>
    </div>
  );
}
