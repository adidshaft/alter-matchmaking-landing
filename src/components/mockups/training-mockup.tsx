"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from './phone-mockup';

export function TrainingMockup({ delay = 0 }: { delay?: number }) {
    return (
        <PhoneMockup delay={delay} className="hover:shadow-[0_0_50px_rgba(115,69,230,0.3)] border-alter-purple/20">
            {/* Background exactly matching Screenshot 1/5 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C1635] via-[#110D23] to-[#1F1240]" />

            {/* Top Toolbar (Screenshot 5) */}
            <div className="absolute top-14 inset-x-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-white/80 font-mono tracking-widest shadow-lg">
                    <span className="text-alter-gold">✦</span> 1 signals captured
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </div>
                </div>
            </div>

            {/* Central Pulsing Audio Waveform / Logo */}
            <div className="relative h-full flex flex-col items-center justify-center pt-10">
                <div className="relative flex items-center justify-center">
                    {/* Concentric rings matching Screenshot 5 */}
                    <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-[-40px] rounded-full border border-alter-purple/40" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute inset-[-20px] rounded-full border border-alter-lightpurple/50" />

                    {/* The dense purple core */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-alter-lightpurple to-alter-purple flex items-center justify-center shadow-[0_0_40px_rgba(166,115,255,0.4)] z-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                        <motion.div animate={{ height: [12, 24, 12, 32, 12] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 bg-white rounded-full mx-[1.5px] relative z-20" />
                        <motion.div animate={{ height: [16, 36, 16, 20, 16] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-1 bg-white rounded-full mx-[1.5px] relative z-20" />
                        <motion.div animate={{ height: [20, 16, 40, 16, 20] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1 bg-white rounded-full mx-[1.5px] relative z-20" />
                        <motion.div animate={{ height: [24, 12, 24, 36, 24] }} transition={{ duration: 2.2, repeat: Infinity }} className="w-1 bg-white rounded-full mx-[1.5px] relative z-20" />
                        <motion.div animate={{ height: [12, 28, 12, 20, 12] }} transition={{ duration: 2.7, repeat: Infinity }} className="w-1 bg-white rounded-full mx-[1.5px] relative z-20" />
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-32 flex flex-col items-center justify-center w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.5, duration: 1 }}
                >
                    <div className="flex items-center gap-2 text-alter-lightpurple mb-6 font-mono text-[10px] tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Listening
                    </div>

                    <div className="font-mono text-white/50 tracking-[0.4em] text-xs font-medium uppercase absolute bottom-[-40px]">
                        a l t e r
                    </div>
                </motion.div>
            </div>
        </PhoneMockup>
    );
}
