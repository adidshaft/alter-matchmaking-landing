"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from './phone-mockup';

export function TrainingMockup({ delay = 0 }: { delay?: number }) {
    return (
        <PhoneMockup delay={delay} className="hover:shadow-[0_0_50px_rgba(115,69,230,0.3)] border-alter-purple/20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1233] via-[#0D0A1A] to-[#26104d] opacity-80" />

            {/* Pulsing Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-alter-purple rounded-full blur-[60px] mix-blend-screen"
            />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center pt-16">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 mb-20 shadow-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-alter-purple to-alter-lightpurple flex items-center justify-center">
                        {/* Simple spark icon representation */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="font-semibold text-white/90">Alter</span>
                </div>

                <motion.div
                    className="flex-1 flex items-center justify-center w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.5, duration: 1 }}
                >
                    <div className="font-mono text-white/80 tracking-[0.5em] text-sm font-medium">
                        a l t e r
                    </div>
                </motion.div>
            </div>
        </PhoneMockup>
    );
}
