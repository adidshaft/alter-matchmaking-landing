"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from './phone-mockup';

export function ScoutingMockup({ delay = 0 }: { delay?: number }) {
    return (
        <PhoneMockup delay={delay} className="hover:shadow-[0_0_50px_rgba(77,217,128,0.2)] border-alter-green/20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[#0D0A1A]" />
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-alter-green/10 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex flex-col px-5 pt-16 pb-8">
                {/* Header Profile */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-lg text-white font-sans shrink-0">
                            RA
                        </div>
                        <div>
                            <div className="font-semibold text-white">Rahul</div>
                            <div className="text-xs text-white/50">Casual Urban & Outdoor Explorer</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white/70">
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white/70" stroke="currentColor" strokeWidth="2">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Agent Log Card */}
                <div className="flex-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col backdrop-blur-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-alter-purple/10 to-transparent pointer-events-none" />

                    {/* Card Header */}
                    <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-alter-green animate-pulse shadow-[0_0_10px_rgba(77,217,128,0.8)]" />
                        <div className="text-xs font-mono font-medium text-alter-lightpurple tracking-widest uppercase">
                            AGENT LOG // LIVE
                        </div>
                    </div>

                    {/* Terminal Area */}
                    <div className="p-5 flex-1 flex flex-col justify-center relative">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: delay + 0.5 }}
                            className="font-mono text-sm text-white/40 text-center space-y-2"
                        >
                            <div>&gt; _</div>
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Scouting begins shortly...
                            </motion.div>
                        </motion.div>

                        {/* Simulated streaming logs */}
                        <div className="absolute bottom-5 left-5 right-5 space-y-2">
                            {[
                                { t: "Analyzing local network...", d: 1.5 },
                                { t: "Filtering by core values...", d: 2.5 },
                                { t: "1 potential match found.", d: 4.0, highlight: true }
                            ].map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: delay + log.d }}
                                    className={`font-mono text-xs ${log.highlight ? 'text-alter-green' : 'text-white/30'}`}
                                >
                                    {log.t}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PhoneMockup>
    );
}
