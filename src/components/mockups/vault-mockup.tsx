"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function VaultMockup({ delay = 0 }: { delay?: number }) {
    return (
        <div className="w-[300px] h-[200px] bg-black/40 dark:bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center relative shadow-2xl overflow-hidden backdrop-blur-xl group hover:border-[#D4AF37]/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-[#D4AF37]/20 transition-colors"></div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.6 }}
                className="relative z-10"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/50">
                        <span className="text-[#D4AF37] text-xs font-mono">AGT</span>
                    </div>
                    <div>
                        <div className="text-white font-serif text-sm">Your Alter Reflects</div>
                        <div className="text-white/40 font-mono text-[10px] tracking-widest uppercase">Daily Reflection</div>
                    </div>
                </div>

                <div className="bg-black/50 border border-white/5 rounded-xl p-4">
                    <p className="text-white/80 text-sm italic leading-relaxed">
                        &ldquo;Looking back on this match, it seems you need someone with a more grounded attachment style. I&apos;ve updated my search strategy to prioritize emotional availability.&rdquo;
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
