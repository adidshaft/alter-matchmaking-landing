"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from './phone-mockup';

export function ScoutingMockup({ delay = 0 }: { delay?: number }) {
    return (
        <PhoneMockup delay={delay} className="hover:shadow-[0_0_50px_rgba(77,217,128,0.2)] border-alter-green/20">
            {/* Background exactly matching Screenshot 2 */}
            <div className="absolute inset-0 bg-[#0B0A12]" />

            {/* Content */}
            <div className="relative h-full flex flex-col px-4 pt-16 pb-8">
                {/* Header Profile */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/80 flex items-center justify-center font-bold text-[18px] text-white font-sans shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)] border border-indigo-400/20">
                            RA
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold text-[17px] text-white tracking-tight leading-none mb-1">Rahul</div>
                            <div className="text-[11px] font-medium text-white/50">Casual Urban & Outdoor Explorer</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#1A1829] flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] text-white/70">
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#1A1829] flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] text-white/70" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Agent Log Card (The Terminal) */}
                <div className="flex-1 rounded-[1.5rem] bg-[#171328] border border-white/[0.04] flex flex-col relative overflow-hidden">
                    {/* Card Header */}
                    <div className="px-5 py-4 border-b border-white/[0.04] bg-white/[0.02] flex items-center gap-3 relative z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                        <div className="text-[11px] font-mono font-semibold text-[#A673FF] tracking-[0.2em] uppercase">
                            AGENT LOG // LIVE
                        </div>
                    </div>

                    {/* Terminal Area */}
                    <div className="p-5 flex-1 flex flex-col items-center justify-center relative">
                        <div className="font-mono text-[13px] text-white/40 flex items-center gap-2 mb-2">
                            <span className="text-[#A673FF]/50">&gt;</span> _
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: delay + 0.5 }}
                            className="font-mono text-[13px] text-white/40 text-center"
                        >
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Scouting begins shortly...
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PhoneMockup>
    );
}
