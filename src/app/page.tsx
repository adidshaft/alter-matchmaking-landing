"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, HeartHandshake, Shield, Sparkles, Network, Plus, BrainCircuit } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { ThemeToggle } from "@/components/theme-toggle";
import dynamic from 'next/dynamic';
import { AgentNetwork } from '@/components/agent-network';

const WaitlistForm = dynamic(() => import('@/components/waitlist-form').then(mod => mod.WaitlistForm), { ssr: false });

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
          <AgentNetwork />

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
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60">
                Dating is exhausting.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-alter-purple to-alter-lightpurple">So we built someone to do it for you.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-black/50 dark:text-white/50 max-w-2xl mx-auto"
            >
              Alter gives you a deeply intuitive AI Matchmaker that actually understands you. You live your life while your Agent goes out into the digital world, filtering out the noise, negotiating dealbreakers, and only introducing you to a real human when a profound, soul-level connection is found.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 z-10"
            >
              <div className="relative group inline-block">
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                  <Image
                    src="/images/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={150}
                    height={50}
                    className="h-[50px] w-auto"
                  />
                </a>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 min-w-max px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  Soon available for Waitlisted Users
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
                </div>
              </div>
              <WaitlistForm />
            </motion.div>
          </div>
        </section>

        {/* The Problem vs The Solution - NEW SECTION */}
        <section className="py-20 -mx-6 px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

              {/* The Old Way */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass rounded-[2rem] p-8 md:p-10 border border-black/5 dark:border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                <h3 className="text-xl font-mono text-black/40 dark:text-white/40 mb-6 uppercase tracking-widest">The Burnout</h3>
                <ul className="space-y-4 text-black/60 dark:text-white/60 text-lg leading-relaxed mix-blend-luminosity">
                  <li className="flex items-start gap-3">
                    <span className="opacity-50 mt-1">✕</span>
                    Endless swiping through shallow, performative profiles built on just a few photos.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="opacity-50 mt-1">✕</span>
                    The mental exhaustion of starting over with &quot;hey, how was your weekend?&quot; 100 times.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="opacity-50 mt-1">✕</span>
                    Investing your time and emotional energy, only to hit a fundamental dealbreaker weeks later.
                  </li>
                </ul>
              </motion.div>

              {/* The Alter Way */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass rounded-[2rem] p-8 md:p-10 border border-alter-purple/20 bg-alter-purple/5 relative overflow-hidden shadow-[0_0_40px_rgba(115,69,230,0.1)]"
              >
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-alter-purple/10 rounded-full blur-[50px]"></div>
                <h3 className="text-xl font-mono text-alter-purple dark:text-alter-lightpurple mb-6 uppercase tracking-widest font-semibold">The Relief</h3>
                <ul className="space-y-4 text-black/80 dark:text-white/80 text-lg leading-relaxed relative z-10">
                  <li className="flex items-start gap-3">
                    <span className="text-alter-purple mt-1">✓</span>
                    <strong>You live your life.</strong> Your personal Matchmaker does the searching, respectfully filtering out incompatible matches.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-alter-purple mt-1">✓</span>
                    <strong>Deep alignment, assured.</strong> Your Agent ensures core beliefs and attachment styles match before you ever say hello.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-alter-purple mt-1">✓</span>
                    <strong>Skip the small talk.</strong> Wake up to a hand-picked human connection, complete with a beautiful summary of exactly why you belong together.
                  </li>
                </ul>
              </motion.div>

            </div>
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
            <h2 className="text-4xl font-bold tracking-tight mb-4">How Your Agent Works</h2>
            <p className="text-black/50 dark:text-white/50 text-lg">It learns you. It searches for you. It matches you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Audio Interview Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group border border-transparent hover:border-alter-purple/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-alter-lightpurple/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-alter-lightpurple/20 transition-colors"></div>
              <Sparkles className="w-10 h-10 text-alter-purple mb-6" />
              <h3 className="text-2xl font-semibold mb-3">1. The Deep Dive</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed text-sm">
                <strong>Have a real, free-flowing conversation.</strong> Speak to your Agent like a close friend. It learns your quirks, your non-negotiables, and what truly makes you feel loved.
              </p>
            </motion.div>

            {/* AI Dossier */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group border border-transparent hover:border-alter-amber/30 transition-all duration-500"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-alter-amber/10 rounded-full blur-[40px] group-hover:bg-alter-amber/20 transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-alter-amber/10 dark:bg-alter-amber/20 flex items-center justify-center text-alter-amber mb-6 font-mono text-sm border border-alter-amber/30">
                {`{}`}
              </div>
              <h3 className="text-xl font-semibold mb-3">Your Digital Soul</h3>
              <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                Your voice, energy, and photos are safely transformed into a highly encrypted persona. This is how your Agent reliably represents your beautiful complexities to the world.
              </p>
            </motion.div>

            {/* The Memory Vault */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group md:col-span-1 border border-transparent hover:border-alter-green/30 transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-alter-green/10 rounded-full blur-[50px] group-hover:bg-alter-green/20 transition-colors"></div>
              <BrainCircuit className="w-10 h-10 text-alter-green mb-6 relative z-10" />
              <h3 className="text-xl font-semibold mb-3 relative z-10">2. The Silent Search</h3>
              <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed relative z-10">
                <strong>It advocates for you 24/7.</strong> Your Agent quietly goes on thousands of digital dates, fiercely protecting your boundaries and your time.
              </p>
            </motion.div>

            {/* 11:11 PM Ritual */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group md:col-span-3 min-h-[300px] flex flex-col md:flex-row items-center gap-10 border border-transparent hover:border-alter-green/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-alter-green/5 to-transparent"></div>
              <div className="flex-1 relative z-10">
                <HeartHandshake className="w-10 h-10 text-alter-green mb-6" />
                <h3 className="text-3xl font-semibold mb-4">3. The Introduction</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed max-w-2xl">
                  <strong>When there is a spark, your Agent steps aside.</strong> Every night at 11:11 PM, if a deeply profound connection is verified, you are introduced to the real human—completely ready to go on that magical first date.
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

        {/* App in Action - iPhone Mockups */}
        <section className="mb-40 relative z-10 px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The App in Action</h2>
            <p className="text-black/50 dark:text-white/50 text-lg">A peek into the autonomous ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
            {/* Mockup 1: Training */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative group p-4 glass rounded-[3rem] border border-black/5 dark:border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl transition hover:scale-[1.02] duration-500">
                <Image
                  src="/images/mockups/energy-orb.png"
                  alt="Alter App - Training Agent"
                  width={300}
                  height={650}
                  className="rounded-[2.2rem] shadow-2xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">1. Deep Connection</h3>
                <p className="text-sm text-black/50 dark:text-white/40 max-w-[250px]">
                  Speak naturally to your AI so it learns the real, unfiltered you.
                </p>
              </div>
            </motion.div>

            {/* Mockup 2: Scouting */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-6 md:-mt-12"
            >
              <div className="relative group p-4 glass rounded-[3rem] border border-alter-purple/20 bg-alter-purple/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(115,69,230,0.15)] transition hover:scale-[1.02] duration-500">
                <Image
                  src="/images/mockups/agent-log.png"
                  alt="Alter App - Agent Scouting Log"
                  width={300}
                  height={650}
                  className="rounded-[2.2rem] shadow-2xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-alter-purple">2. The Silent Search</h3>
                <p className="text-sm text-black/50 dark:text-white/40 max-w-[250px]">
                  Watch your Agent advocate for you in real-time, respectfully filtering out bad matches.
                </p>
              </div>
            </motion.div>

            {/* Mockup 3: Matching */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative group p-4 glass rounded-[3rem] border border-black/5 dark:border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl transition hover:scale-[1.02] duration-500">
                <Image
                  src="/images/mockups/match-reveal.png"
                  alt="Alter App - Match Reveal"
                  width={300}
                  height={650}
                  className="rounded-[2.2rem] shadow-2xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">3. The Magical Reveal</h3>
                <p className="text-sm text-black/50 dark:text-white/40 max-w-[250px]">
                  Wake up to a beautiful breakdown of exactly why you belong together.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="text-center max-w-2xl mx-auto py-20 pb-32">
          <Shield className="w-12 h-12 mx-auto text-black/30 dark:text-white/30 mb-6" />
          <h2 className="text-3xl font-semibold mb-6">Your Heart, Safely Guarded</h2>
          <p className="text-black/50 dark:text-white/50 text-lg leading-relaxed">
            Alter values intimacy and intuition. Your deepest thoughts stay strictly between you and your Matchmaker. No public profiles to be judged. No superficial swiping. Just an intensely private sanctuary that brings you love when the time is right.
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
                While Alter is currently optimized for finding your partner, the underlying matching engine is built to understand human connection. Soon, your Agent will be able to scout for friends, co-founders, and collaborators with the same precision.
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
                Do I have to chat with my Agent every day?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                Only once. During onboarding, you spend 5 minutes speaking to your Agent so it can learn your personality. After that, your Agent becomes your personal matchmaker, scouting in the wild for you in the background. You only open the app when it finds a highly compatible human match.
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
            <div className="relative group inline-block">
              <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="h-[50px] w-auto"
                />
              </a>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 min-w-max px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                Soon available for Waitlisted Users
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
              </div>
            </div>
            <WaitlistForm />
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
