"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Shield, Zap, ChevronRight, Github, Code2, Network, Plus, Rocket, BrainCircuit, MessageSquare } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { ThemeToggle } from "@/components/theme-toggle";
import { WaitlistForm } from "@/components/waitlist-form";

const agentLogs = [
  "Agent 004 terminating connection: Vibe mismatch detected (< 85% scalar).",
  "Agent 092 validating a 98% vector harmony. Initiating handshake...",
  "> [SYS] Executing stateless 5-turn Gemini extraction pipeline.",
  "> [SYS] Injecting 3 user memories via RAG into negotiation context.",
  "Agent 042 cached a potential high-value node for 11:11 PM.",
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

        {/* Beautiful AI Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[85vh] text-center pt-10">

          {/* Framer Motion Pulsing Orb */}
          <motion.div
            style={{ y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40 z-0"
          >
            <div className="absolute inset-0 rounded-full bg-alter-purple blur-[100px] mix-blend-screen animate-pulse duration-3000"></div>
            <div className="absolute inset-20 rounded-full bg-alter-lightpurple blur-[80px] mix-blend-screen opacity-50"></div>
          </motion.div>

          <div className="relative z-10 w-full max-w-5xl space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4"
            >
              <span className="px-4 py-1.5 rounded-full border border-alter-purple/30 bg-alter-purple/10 text-alter-lightpurple text-sm font-medium tracking-wide mb-6 inline-block">
                iOS Exclusive
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight font-sans">
                Stop Swiping.<br />
                So We Built An <span className="text-alter-purple dark:text-alter-lightpurple">AI Agent</span> That Does It For You.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-black/50 dark:text-white/50 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              Human-to-human discovery is inefficient. Alter uses Multi-Agent Orchestration. Deploy your personal AI agent to scout the network, negotiate via MCP, and alert you only when a statistically significant vector match (&gt;90% Cosine Similarity) is found.
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
                  className="h-[50px] w-auto relative z-10"
                />
              </a>
              <div className="flex w-full sm:w-auto relative max-w-xs justify-center items-center">
                <WaitlistForm />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Scout Marquee */}
        <section className="py-20 overflow-hidden relative border-y border-black/5 dark:border-white/5 mb-32 -mx-6 px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)] z-10 w-full pointer-events-none"></div>

          <div className="flex font-mono text-[15px] tracking-wider min-w-full">
            {/* First Set */}
            <div className="flex w-max animate-marquee shrink-0">
              {[...agentLogs, ...agentLogs, ...agentLogs].map((log, i) => {
                const isMatch = log.includes("harmony") || log.includes("shortlisted") || log.includes("cached");
                const isReject = log.includes("terminating");
                const bgClass = isMatch ? 'bg-alter-green' : isReject ? 'bg-alter-red' : 'bg-alter-amber';
                const textClass = isMatch ? 'text-alter-green' : isReject ? 'text-alter-red' : 'text-alter-amber';

                return (
                  <div key={i} className="flex items-center gap-4 px-10 text-black/80 dark:text-white/80 whitespace-nowrap">
                    <span className="text-black/30 dark:text-white/30">&gt;</span>
                    <span className={`${bgClass} w-1.5 h-1.5 rounded-full animate-pulse opacity-80`}></span>
                    <span className={textClass}>{log}</span>
                  </div>
                )
              })}
            </div>

            {/* Duplicate Set for Seamless Loop */}
            <div className="flex w-max animate-marquee shrink-0" aria-hidden="true">
              {[...agentLogs, ...agentLogs, ...agentLogs].map((log, i) => {
                const isMatch = log.includes("harmony") || log.includes("shortlisted") || log.includes("cached");
                const isReject = log.includes("terminating");
                const bgClass = isMatch ? 'bg-alter-green' : isReject ? 'bg-alter-red' : 'bg-alter-amber';
                const textClass = isMatch ? 'text-alter-green' : isReject ? 'text-alter-red' : 'text-alter-amber';

                return (
                  <div key={i} className="flex items-center gap-4 px-10 text-black/80 dark:text-white/80 whitespace-nowrap">
                    <span className="text-black/30 dark:text-white/30">&gt;</span>
                    <span className={`${bgClass} w-1.5 h-1.5 rounded-full animate-pulse opacity-80`}></span>
                    <span className={textClass}>{log}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Under the Hood Section */}
        <section className="mb-40 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Architecture</h2>
            <p className="text-black/50 dark:text-white/50 text-lg">Zero-knowledge vibe verification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Box 1: Multi-Agent Orchestration */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 md:col-span-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-alter-lightpurple/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-alter-lightpurple/20 transition-colors"></div>
              <Zap className="w-10 h-10 text-alter-purple mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Multi-Agent Orchestration</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-md">
                Your agent doesn&apos;t just filter; it negotiates. Using the Model Context Protocol (MCP), your node communicates with thousands of others, exchanging encrypted constraint proofs to find non-obvious alignments in the vector space.
              </p>
            </motion.div>

            {/* Box 2: Continuous Reinforcement Learning */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-alter-amber/10 rounded-full blur-[40px] group-hover:bg-alter-amber/20 transition-colors"></div>
              <div>
                <Database className="w-10 h-10 text-alter-amber mb-6" />
                <h3 className="text-xl font-semibold mb-3">Continuous RL</h3>
                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                  Every interaction is a gradient update. The system continuously refines your matchmaking weights via RLHF based on your implicit and explicit feedback.
                </p>
              </div>
            </motion.div>

            {/* Box 3: Dynamic Multimodal Onboarding */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 md:col-span-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-alter-purple/10 rounded-full blur-[60px] -ml-20 -mt-20 group-hover:bg-alter-purple/20 transition-colors"></div>
              <MessageSquare className="w-10 h-10 text-alter-purple mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Dynamic Multimodal Onboarding</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-md">
                A stateless, 5-turn extraction pipeline powered by Gemini 2.5 Pro. It dynamically probes your core beliefs and intimacy needs through highly contextual audio conversation, generating a continuous JSON identity representation without storing plaintext logs.
              </p>
            </motion.div>

            {/* Box 4: RAG Memory Vault */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-alter-green/10 rounded-full blur-[40px] group-hover:bg-alter-green/20 transition-colors"></div>
              <div>
                <BrainCircuit className="w-10 h-10 text-alter-green mb-6 relative z-10" />
                <h3 className="text-xl font-semibold mb-3 relative z-10">RAG Memory Vault</h3>
                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed relative z-10">
                  Embed ephemeral thoughts directly into your agent&apos;s vector space. Top-k relevant memories are retrieved via cosine similarity and injected into the negotiation prompt context.
                </p>
              </div>
            </motion.div>

            {/* Box 5: Privacy via Local Caching */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-10 relative overflow-hidden group md:col-span-3 min-h-[300px] flex flex-col md:flex-row items-center gap-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-alter-purple/5 to-transparent"></div>
              <div className="flex-1 relative z-10">
                <Shield className="w-10 h-10 text-alter-green mb-6" />
                <h3 className="text-3xl font-semibold mb-4">Privacy via Local Caching</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed max-w-2xl">
                  Centralized databases are vulnerabilities. Your deeply personal interaction logs and RAG chunks are processed and cached locally on your device&apos;s Secure Enclave. The global network only ever sees encrypted vector representations. Zero data leaks. Zero public profiles.
                </p>
              </div>

              {/* Technical Node Graph Visual - keeping it clean */}
              <div className="flex-shrink-0 flex items-center gap-4 relative z-10 w-full md:w-auto justify-center">
                <div className="w-32 h-20 rounded-xl border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center font-mono text-sm text-black/50 dark:text-white/40">LOCAL ENCLAVE</div>
                <div className="w-12 h-[1px] bg-gradient-to-r from-alter-purple/0 via-alter-purple to-alter-purple/0 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-alter-purple rounded-full blur-[2px]"></div>
                </div>
                <div className="w-32 h-20 rounded-xl border border-alter-green/30 bg-alter-green/10 backdrop-blur-sm flex items-center justify-center font-mono text-sm text-alter-green">GLOBAL GRAPH</div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* The Alter Protocol Tease */}
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
                The Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-alter-purple to-alter-lightpurple">Orchestration</span> Layer.
              </h2>

              <p className="text-black/60 dark:text-white/60 text-lg md:text-xl leading-relaxed mb-10">
                While Alter is optimized for romance today, the underlying mathematics of vector similarity apply to any human connection. Friends, co-founders, investors, or collaborators.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
                <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-alter-purple/30 transition-colors">
                  <Code2 className="w-6 h-6 text-alter-lightpurple mb-4" />
                  <h4 className="font-semibold text-lg mb-2">Open Intelligence</h4>
                  <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                    The core matching architecture—including scoring weights, prompt structures, and constraint penalties—will be open-sourced.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-alter-green/30 transition-colors">
                  <Database className="w-6 h-6 text-alter-green mb-4" />
                  <h4 className="font-semibold text-lg mb-2">Bring Your Own Engine</h4>
                  <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                    Wrap ChatGPT, Gemini, or point to a local LLaMA instance. You own the inference engine that processes your relationships.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://adidshaft.github.io/alter-docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
                >
                  <Github size={20} />
                  Algorithm Documentation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-40 relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How it works.</h2>
            <p className="text-black/50 dark:text-white/50 text-lg">The architecture behind autonomous connection.</p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group glass rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden open:border-alter-purple/30 transition-colors duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg hover:text-alter-purple transition-colors">
                Is my data actually private?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                Yes. Traditional dating apps upload your entire plaintext history to a centralized database. Alter processes your deeply personal interactions (like your voice interview) on your device&apos;s Secure Enclave. The global network only ever sees an encrypted 3072-dimensional math vector representing your &quot;vibe.&quot;
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group glass rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden open:border-alter-purple/30 transition-colors duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg hover:text-alter-purple transition-colors">
                Do I have to chat with an AI?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                Only once. During onboarding, you complete a dynamic 5-minute audio interview with the AI so it can learn your personality, tone, and dealbreakers. After that, your agent scouts the network in the background, only alerting you when it finds a human match with a vector similarity &gt; 90%.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group glass rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden open:border-alter-purple/30 transition-colors duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg hover:text-alter-purple transition-colors">
                How does the compatibility scoring work?
                <Plus className="w-5 h-5 text-black/40 dark:text-white/40 group-open:rotate-45 group-open:text-alter-purple transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed text-sm">
                The Alter Matchmaker uses a multi-dimensional, proprietary orchestration model. We fuse high-dimensional semantic vectors (personality, aesthetics, tone) with deep relational algorithms. The exact weighting mechanism is constantly evolving through continuous reinforcement learning, ensuring that every connection your agent brings you is statistically significant.
              </div>
            </details>
          </div>
        </section>

        {/* Developer Ecosystem CTA */}
        <section className="mb-32 relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-alter-purple/10 rounded-full mb-6">
            <Rocket className="w-8 h-8 text-alter-purple" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Build the future of connection.</h2>
          <p className="text-black/60 dark:text-white/60 text-lg mb-8">
            Alter Protocol will soon open its doors to developers. Create new prompt extensions, host your own matching engines, and contribute to the open compatibility layer.
          </p>

          <div className="relative inline-block group">
            <button
              disabled
              className="px-8 py-4 rounded-full font-medium bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 cursor-not-allowed uppercase tracking-wider text-sm transition-all group-hover:bg-black/10 dark:group-hover:bg-white/10"
            >
              Contribute Now
            </button>

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-alter-purple text-white text-xs font-bold rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none whitespace-nowrap shadow-lg">
              Coming Soon
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-alter-purple rotate-45"></div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/5 py-10 text-center text-black/40 dark:text-white/30 text-sm font-mono flex flex-col sm:flex-row justify-between px-10 items-center">
        <p>© 2026 Alter Protocol.</p>
        <p className="mt-4 sm:mt-0 opacity-50">iOS EXCLUSIVE</p>
      </footer>
    </div>
  );
}
