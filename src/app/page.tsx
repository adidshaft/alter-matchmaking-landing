"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { HeartHandshake, Shield, BrainCircuit, Mic, Users, User } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { AgentNetwork } from '@/components/agent-network';
import { InteractiveBackground } from '@/components/interactive-background';

const WaitlistForm = dynamic(() => import('@/components/waitlist-form').then(mod => mod.WaitlistForm), { ssr: false });

import { RevealMockup } from "@/components/mockups/reveal-mockup";
import { TrainingMockup } from "@/components/mockups/training-mockup";
import { ScoutingMockup } from "@/components/mockups/scouting-mockup";

const agentLogs = [
  "Agent 004 rejected a match: Vibe mismatch.",
  "Agent 092 found a 98% compatibility score.",
  "Agent 011 negotiating boundaries on nightlife.",
  "Agent 077 analyzing a new profile's aesthetic.",
  "Agent 042 shortlisted a potential match for tomorrow.",
];

export default function Home() {
  const { scrollY } = useScroll();

  // Parallax layers
  const heroBgY = useTransform(scrollY, [0, 900], ["0px", "140px"]);
  const heroFloatRY = useTransform(scrollY, [0, 900], ["0px", "-90px"]);
  const heroFloatLY = useTransform(scrollY, [0, 900], ["0px", "60px"]);
  const alterBgY = useTransform(scrollY, [400, 2200], ["0px", "80px"]);
  const revealFrontY = useTransform(scrollY, [1200, 3200], ["0px", "-70px"]);
  const revealBackY = useTransform(scrollY, [1200, 3200], ["0px", "-30px"]);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      <InteractiveBackground />

      {/* ── Wordmark ── */}
      <header className="fixed top-8 inset-x-0 flex justify-center z-[100] pointer-events-none select-none">
        <span className="font-mono text-2xl md:text-3xl font-light tracking-[0.65em] text-white/80 lowercase pl-[0.65em]">
          a l t e r
        </span>
      </header>

      <main className="relative z-10 w-full flex flex-col">

        {/* ══════════════════════════════════════════════════
            SCENE I — HERO
        ══════════════════════════════════════════════════ */}
        <section id="hero" className="sticky top-0 w-full h-screen flex flex-col items-center justify-center text-center z-0 overflow-hidden">

          {/* Background parallax */}
          <motion.div style={{ y: heroBgY }} className="absolute inset-[-15%] z-0">
            <Image
              src="/images/renaissance_hero_bg.png"
              alt=""
              fill
              className="object-cover object-center opacity-30 mix-blend-screen grayscale"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black z-[1]" />

          {/* Center glow */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-alter-purple/[0.08] rounded-full blur-[200px]" />
          </div>

          {/* Floating mockup — right */}
          <motion.div
            style={{ y: heroFloatRY }}
            initial={{ opacity: 0, x: 80, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:block absolute right-[5%] top-1/2 -translate-y-[55%] z-10 drop-shadow-[0_60px_120px_rgba(115,69,230,0.4)]"
          >
            <div className="rounded-[1rem] overflow-hidden ring-1 ring-white/[0.12] -rotate-6">
              <Image
                src="/images/renaissance-cupid-full.png"
                alt="Renaissance Cupid"
                width={520}
                height={520}
                className="w-[280px] h-auto object-cover"
              />
            </div>
          </motion.div>


          {/* Hero content */}
          <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md text-white/50 text-[11px] font-mono tracking-[0.18em] uppercase mb-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-alter-gold animate-pulse" />
                AI Matchmaking · 2026
              </motion.div>

              <h1 className="text-[20vw] md:text-[13.5vw] leading-[0.76] tracking-tighter font-black font-sans uppercase text-white mix-blend-difference">
                END OF<br />SWIPING.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="mt-10 flex flex-col items-center gap-8 w-full max-w-lg"
            >
              <p className="text-xl md:text-2xl text-white/50 font-serif italic tracking-tight leading-relaxed">
                A private, relentless AI Agent matchmaking.
              </p>

              <div className="glass p-6 md:p-8 rounded-[2rem] w-full flex flex-col items-center gap-6 border border-white/[0.07]">
                <WaitlistForm />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                <div className="relative group inline-block">
                  <button className="transition-transform hover:scale-[1.04] active:scale-95">
                    <Image src="/images/app-store-badge.svg" alt="Download on the App Store" width={155} height={52} />
                  </button>
                  <div className="absolute -top-11 left-1/2 -translate-x-1/2 min-w-max px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/[0.1] text-white text-[11px] font-mono rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Coming soon.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-white/50 text-[10px] font-mono tracking-[0.25em] uppercase">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SCENE II — YOUR ALTER
        ══════════════════════════════════════════════════ */}
        <section id="your-alter" className="sticky top-0 w-full min-h-screen bg-[#030303] z-10">
          <motion.div style={{ y: alterBgY }} className="absolute inset-[-10%] z-0 pointer-events-none">
            <Image
              src="/images/renaissance_vault_bg.png"
              alt=""
              fill
              className="object-cover opacity-[0.10] mix-blend-screen grayscale"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303] z-[1]" />
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-alter-gold/[0.025] rounded-full blur-[180px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-alter-purple/[0.04] rounded-full blur-[160px]" />
          </div>

          <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-14 pt-32 pb-24">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">01</span>
              <div className="h-px w-12 bg-white/[0.12]" />
              <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">The Soul Within</span>
            </div>

            <h2 className="text-[11vw] md:text-[7.5vw] leading-[0.82] font-serif italic tracking-tight text-white mb-14 lg:mb-20">
              The<br />Soul Within
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-auto">

              {/* Card A — Deep Dive */}
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85 }}
                className="lg:col-span-7 glass rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-between min-h-[420px] border border-white/[0.05] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-alter-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                      <Mic className="w-7 h-7 text-white/80" />
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 px-3 py-1.5 border border-white/[0.15] rounded-full">
                      New
                    </span>
                  </div>
                  <h3 className="text-[6vw] md:text-[4vw] lg:text-[3vw] font-serif italic tracking-tight text-white leading-[0.9] mb-6">
                    Deep<br />Dive
                  </h3>
                  <p className="text-white/40 font-sans font-medium leading-relaxed text-base md:text-lg max-w-sm">
                    A real, fluid voice conversation. No forms. Alter listens to your tone, hesitations, and passions — naturally mapping who you are and what you truly need.
                  </p>
                </div>
                <div className="relative z-10 mt-10 pt-6 border-t border-white/[0.05] flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-alter-gold animate-pulse" />
                  <span className="text-alter-gold font-mono text-[10px] tracking-[0.2em] uppercase opacity-100">AI Voice Interview</span>
                </div>
              </motion.div>

              {/* Card B — Voice abstraction */}
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1 }}
                className="lg:col-span-5 glass rounded-[2.5rem] flex flex-col items-center justify-center min-h-[420px] border border-white/[0.05] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-alter-purple/[0.18] via-transparent to-alter-gold/[0.03]" />
                <div className="absolute inset-0 bg-alter-gold/5 blur-[100px] rounded-full scale-150 animate-[pulse_4s_ease-in-out_Infinity]" />

                <div className="relative z-10 w-full flex items-center justify-center">
                  <div className="w-48 h-48 relative flex items-center justify-center">
                    {/* Concentric expanding voice rings */}
                    <div className="absolute inset-0 rounded-full border border-alter-gold/20 scale-150 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_Infinity]" />
                    <div className="absolute inset-0 rounded-full border border-alter-purple/30 scale-110 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_Infinity_0.5s]" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#120D26] to-black border border-white/10 z-10 shadow-[0_0_50px_rgba(166,115,255,0.3)] flex items-center justify-center">
                      <div className="flex items-center gap-1.5 opacity-90">
                        {[1, 2, 3, 2, 1].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h * 8}px`, `${h * 16}px`, `${h * 8}px`] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1.5 rounded-full bg-alter-lightpurple"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 z-10 italic font-serif text-white/50 tracking-wider">Listening...</div>
              </motion.div>

              {/* Card C — Silent Protocol */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.15 }}
                className="lg:col-span-8 glass rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between min-h-[280px] border border-white/[0.05] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-7">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-serif italic tracking-tight text-white mb-4">
                    Silent Protocol
                  </h3>
                  <p className="text-white/40 font-sans font-medium leading-relaxed text-base max-w-xl">
                    While you&apos;re busy, your Alter connects with thousands of profiles simultaneously — predicting friction, evaluating chemistry, filtering noise before you ever see a name.
                  </p>
                </div>
                <div className="relative z-10 mt-7 pt-5 border-t border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/30 animate-ping" />
                    <span className="text-alter-gold/80 font-mono text-[10px] tracking-[0.2em] uppercase">Running Now</span>
                  </div>
                  <span className="text-white/[0.12] font-mono text-[10px] tracking-wider">1,000+ evaluations/sec</span>
                </div>
              </motion.div>

              {/* Card D — Always Learning */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.22 }}
                className="lg:col-span-4 glass rounded-[2rem] p-8 flex flex-col justify-between min-h-[280px] border border-white/[0.05] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent" />
                <div className="relative z-10">
                  <div className="mb-7">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                      <BrainCircuit className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif italic tracking-tight text-white mb-4">
                    Always<br />Learning
                  </h3>
                  <p className="text-white/40 font-sans font-medium leading-relaxed text-sm">
                    Your Alter sharpens with every decision you make. When something doesn&apos;t fit, it listens.
                  </p>
                </div>
                <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.05]">
                  <span className="text-alter-gold font-mono text-[10px] tracking-[0.2em] uppercase opacity-100">Adaptive Intelligence</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SCENE III — THE REVEAL
        ══════════════════════════════════════════════════ */}
        <section id="the-reveal" className="sticky top-0 w-full min-h-screen bg-[#060606] z-20 border-t border-white/[0.04]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/4 w-[700px] h-[500px] bg-indigo-900/[0.14] rounded-full blur-[180px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-alter-purple/[0.07] rounded-full blur-[140px]" />
          </div>

          <div className="relative z-10 max-w-[88rem] mx-auto px-6 lg:px-14 pt-24 pb-20">

            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">02</span>
              <div className="h-px w-12 bg-white/[0.12]" />
              <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">The Reveal</span>
            </div>

            <h2 className="text-[11vw] md:text-[7.5vw] leading-[0.82] font-serif italic tracking-tight text-white mb-14 lg:mb-20">
              One Match.<br />Every Day.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

              {/* Left Column - Abstract UI Representation */}
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="lg:col-span-5 flex flex-col items-center justify-center min-h-[580px] relative glass rounded-[2.5rem] border border-white/[0.05] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606] z-10" />
                <div className="absolute inset-0 bg-alter-purple/5 blur-[100px] rounded-full scale-150 animate-[pulse_5s_ease-in-out_Infinity]" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay z-0" />

                {/* Simulated Data Stream Background */}
                <div className="absolute inset-0 flex flex-col justify-center px-10 gap-4 opacity-30 z-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center justify-between border-b border-white/[0.08] pb-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                        <div className="space-y-2">
                          <div className="w-24 h-2 rounded bg-white/10" />
                          <div className="w-16 h-1.5 rounded bg-white/5" />
                        </div>
                      </div>
                      <div className="text-alter-gold/60 font-mono text-[10px]">98%</div>
                    </motion.div>
                  ))}
                </div>

                {/* Central "The Match" Element */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center mt-8">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#1A1435] to-[#0A0713] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(166,115,255,0.4),transparent_60%)]" />
                    <User className="w-10 h-10 text-white/80 mb-2 relative z-10" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-alter-gold relative z-10">Match</span>
                  </div>
                  <h3 className="text-2xl font-serif italic text-white tracking-tight mb-2">11:11 Match Found</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white/60 text-[10px] uppercase font-mono tracking-wider">Connection Verified</span>
                  </div>
                </div>
              </motion.div>

              {/* Right column */}
              <div className="lg:col-span-7 flex flex-col gap-4">

                {/* The Dossier */}
                <motion.div
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.1 }}
                  className="flex-1 glass rounded-[2rem] p-10 border border-white/[0.05] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-alter-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                        <HeartHandshake className="w-6 h-6 text-white/60" />
                      </div>
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-alter-gold/40 px-3 py-1.5 border border-alter-gold/[0.15] rounded-full bg-alter-gold/[0.04]">
                        Daily
                      </span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-serif italic tracking-tight text-white leading-none mb-5">
                      The Dossier
                    </h3>
                    <p className="text-white/40 font-sans font-medium leading-relaxed text-base max-w-lg">
                      Wake up to a hand-picked human connection. A beautifully synthesized, brutally honest explanation of exactly why you two belong together — delivered every morning at 11:11.
                    </p>
                  </div>
                </motion.div>

                {/* Your Network */}
                <motion.div
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.18 }}
                  className="glass rounded-[2rem] p-8 border border-white/[0.05] relative overflow-hidden"
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white/60" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif italic tracking-tight text-white mb-2">Your Network</h3>
                      <p className="text-white/40 font-sans font-medium leading-relaxed text-sm">
                        Every Alter in the ecosystem scouts on behalf of their human. Yours never sleeps.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-alter-gold/40"
                        animate={{ opacity: [0.15, 1, 0.15] }}
                        transition={{ duration: 2.5, delay: i * 0.12, repeat: Infinity }}
                      />
                    ))}
                    <span className="text-alter-gold/80 font-mono text-[10px] ml-1 tracking-wider">+∞ active alters</span>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SCENE IV — SIMULATION
        ══════════════════════════════════════════════════ */}
        <section id="simulation" className="sticky top-0 w-full min-h-screen flex flex-col items-center justify-center py-24 bg-[#040404] px-4 z-30 border-t border-white/[0.04]">

          <div className="text-center mb-14 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">03</span>
              <div className="h-px w-12 bg-white/[0.12]" />
              <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">The Architecture</span>
            </div>
            <h2 className="text-[15vw] md:text-[10vw] leading-[0.8] font-serif italic tracking-tight text-white mb-7">
              Simulation
            </h2>
            <p className="text-lg md:text-xl text-white/35 font-sans font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
              While you sleep, your Alter negotiates millions of permutations to find the singular person meant for you.
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto h-[62vh] relative overflow-visible">
            <div className="absolute inset-0 z-10 p-4 overflow-visible">
              <AgentNetwork />
            </div>
            <div className="absolute top-5 left-5 z-20 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/[0.06] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-alter-gold animate-pulse" />
              Agent Network
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════
            SCENE V — MECHANICS
        ══════════════════════════════════════════════════ */}
        <section id="faq" className="sticky top-0 w-full min-h-screen flex flex-col items-center justify-center py-28 px-6 bg-[#020202] z-40 border-t border-white/[0.04] relative">

          {/* New Generated Art Asset */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen grayscale-[50%]">
            <Image
              src="/images/renaissance_connection.png"
              alt="Renaissance Connection"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto w-full">

            <div className="mb-16 lg:mb-20">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">04</span>
                <div className="h-px w-12 bg-white/[0.12]" />
                <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">Questions</span>
              </div>
              <h2 className="text-[13vw] md:text-[8vw] leading-[0.82] font-serif italic tracking-tight text-white">
                Mechanics
              </h2>
            </div>

            <div className="grid gap-3 max-w-4xl">
              {[
                {
                  q: "How does the Deep Dive interview work?",
                  a: "An immersive voice conversation. No swiping, no typing. You speak naturally, and Alter listens to your tone, hesitations, and passions — mapping your psychological profile and core values."
                },
                {
                  q: "What is the Silent Search Protocol?",
                  a: "Once your profile is built, it enters our secure network. Your Alter autonomously evaluates thousands of potential matches every second, running deep compatibility checks based on your attachment style, values, and dealbreakers — all without you lifting a finger."
                },
                {
                  q: "How many matches will I receive?",
                  a: "Alter is designed for precision, not volume. You will receive very few matches, but each Dossier represents a mathematically and psychologically validated high-probability connection."
                },
                {
                  q: "Is my data private?",
                  a: "Absolutely. All deep dive audio is processed securely to build your profile, then immediately discarded. Your Alter works entirely on your behalf — your personal details are never exposed during the matching process."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="glass group rounded-2xl border border-white/[0.05] transition-all duration-300 hover:border-white/[0.14]"
                >
                  <div className="p-7 lg:p-9">
                    <h4 className="text-xl font-black font-sans tracking-tight text-white mb-3 flex items-center gap-5 uppercase">
                      <span className="text-white/[0.18] font-mono text-base shrink-0">0{i + 1}</span>
                      {faq.q}
                    </h4>
                    <p className="text-white/40 font-sans font-medium text-base leading-relaxed pl-[3.25rem] max-w-3xl">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SCENE VI — COVENANT
        ══════════════════════════════════════════════════ */}
        <section id="covenant" className="sticky top-0 w-full min-h-screen flex flex-col items-center justify-center text-center bg-[#030303] z-50 border-t border-white/[0.04] px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-alter-purple/[0.07] rounded-full blur-[160px]" />
            <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-alter-gold/[0.03] rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/[0.1]" />
              <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">Join the Waitlist</span>
              <div className="h-px w-16 bg-white/[0.1]" />
            </div>

            <h2 className="text-[14vw] md:text-[10vw] leading-[0.8] font-serif italic tracking-tight text-white mb-4">
              The Time<br />Is Now.
            </h2>

            <p className="text-white/30 font-sans text-lg font-medium tracking-tight mb-12">
              The renaissance starts with you.
            </p>

            <div className="glass p-8 md:p-10 rounded-[2.5rem] w-full max-w-md mx-auto border border-white/[0.06]">
              <WaitlistForm />
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-6" />
              <div className="relative group inline-block">
                <button className="transition-transform hover:scale-[1.04] active:scale-95">
                  <Image src="/images/app-store-badge.svg" alt="Download on the App Store" width={155} height={52} />
                </button>
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 min-w-max px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/[0.1] text-white text-[11px] font-mono rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Coming soon.
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="py-8 text-center text-white/[0.18] text-[10px] font-mono relative z-[60] bg-black border-t border-white/[0.04] tracking-[0.18em] uppercase">
        <div className="flex items-center justify-center gap-3 mb-2.5">
          <div className="w-8 h-px bg-white/[0.08]" />
          <Image src="/images/logo-dark.png" alt="Alter" width={14} height={14} className="opacity-20" />
          <div className="w-8 h-px bg-white/[0.08]" />
        </div>
        <p>© 2026 The Alter Bureau · All Rights Reserved</p>
      </footer>

      {/* ── Ticker ── */}
      <div className="w-full py-3 bg-black overflow-hidden relative z-[60] font-mono text-[10px] uppercase tracking-[0.28em] text-white/[0.18] flex items-center border-t border-white/[0.04]">
        <div className="flex w-max animate-marquee shrink-0 items-center">
          {[...agentLogs, ...agentLogs].map((log, i) => (
            <div key={i} className="flex items-center gap-4 px-10 whitespace-nowrap">
              <span className="text-alter-gold/30">✦</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
        <div className="flex w-max animate-marquee shrink-0 items-center" aria-hidden="true">
          {[...agentLogs, ...agentLogs].map((log, i) => (
            <div key={i} className="flex items-center gap-4 px-10 whitespace-nowrap">
              <span className="text-alter-gold/30">✦</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
