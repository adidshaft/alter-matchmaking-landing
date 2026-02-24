"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from './phone-mockup';

export function RevealMockup({ delay = 0 }: { delay?: number }) {
    return (
        <PhoneMockup delay={delay} className="hover:shadow-[0_0_50px_rgba(166,115,255,0.2)] border-white/10">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[#0D0A1A]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />

            {/* Content */}
            <div className="relative h-full flex flex-col px-5 pt-20">

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: delay + 0.2, duration: 0.8 }}
                        className="font-mono text-alter-lightpurple text-sm tracking-[0.2em] mb-3"
                    >
                        11:11
                    </motion.div>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: delay + 0.4, duration: 0.8 }}
                        className="text-3xl font-bold text-white tracking-tight mb-2"
                    >
                        Your Daily Reveal
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: delay + 0.6, duration: 0.8 }}
                        className="text-white/50 text-sm"
                    >
                        The agents have spoken.
                    </motion.p>
                </div>

                {/* Reveal Card */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: delay + 0.8, duration: 0.8 }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-t-[2.5rem] mt-4 flex flex-col items-center pt-10 px-6 backdrop-blur-xl relative overflow-hidden"
                >
                    {/* Concentric Circles Animation */}
                    <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full border border-indigo-400"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute inset-4 rounded-full border border-indigo-500"
                        />
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] z-10">
                            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white">
                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">Your Match</h3>
                    <div className="px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium text-center">
                        Minimalist Urban & Cozy Contemporary
                    </div>

                    {/* Little fade out effect at bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#151225] to-transparent pointer-events-none" />
                </motion.div>

            </div>
        </PhoneMockup>
    );
}
