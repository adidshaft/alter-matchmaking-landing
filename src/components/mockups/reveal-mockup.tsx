"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from './phone-mockup';

export function RevealMockup({ delay = 0 }: { delay?: number }) {
    return (
        <PhoneMockup delay={delay} className="hover:shadow-[0_0_50px_rgba(166,115,255,0.2)] border-white/10">
            {/* Background exactly matching Screenshot 4 */}
            <div className="absolute inset-0 bg-[#0B0818]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#1F1240] blur-[100px] rounded-full mix-blend-screen opacity-80" />

            {/* Content */}
            <div className="relative h-full flex flex-col pt-24">

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.2, duration: 0.8 }}
                        className="font-mono text-alter-lightpurple text-[10px] tracking-[0.4em] mb-2 uppercase"
                    >
                        1 1 : 1 1
                    </motion.div>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: delay + 0.4, duration: 0.8 }}
                        className="text-[28px] font-bold text-white tracking-tight leading-tight mb-2"
                    >
                        Your Daily Reveal
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: delay + 0.6, duration: 0.8 }}
                        className="text-white/40 text-sm font-medium"
                    >
                        The agents have spoken.
                    </motion.p>
                </div>

                {/* Reveal Card (Floating over bottom) */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: delay + 0.8, duration: 0.8, type: "spring", stiffness: 50 }}
                    className="flex-1 bg-white/[0.03] border border-white/10 rounded-t-[2.5rem] mt-auto flex flex-col items-center pt-10 px-6 backdrop-blur-xl relative overflow-hidden"
                >
                    {/* The Match Avatar */}
                    <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-[-10px] rounded-full border border-alter-purple/40"
                        />
                        <div className="absolute inset-[-2px] rounded-full border border-alter-lightpurple/30 z-10" />
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-alter-lightpurple to-alter-purple flex items-center justify-center shadow-[0_0_30px_rgba(166,115,255,0.3)] z-20">
                            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white/90">
                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-[22px] font-bold text-white mb-2">Your Match</h3>

                    <div className="w-[85%] mx-auto bg-alter-purple/10 px-4 py-2 rounded-full border border-alter-purple/20 text-center mb-6">
                        <p className="text-alter-lightpurple/80 text-[11px] leading-tight font-medium">Minimalist Urban & Cozy Contemporary</p>
                    </div>

                    {/* View Profile Pill */}
                    <div className="absolute bottom-6 right-6">
                        <div className="bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex items-center gap-2 cursor-pointer shadow-lg">
                            <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-xs font-medium text-white/90">View Profile</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PhoneMockup>
    );
}
