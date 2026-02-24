"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PhoneMockupProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function PhoneMockup({ children, className = "", delay = 0 }: PhoneMockupProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            className={`relative group p-3 glass rounded-[3.5rem] border border-black/5 dark:border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl transition hover:scale-[1.02] duration-500 w-[300px] h-[600px] flex-shrink-0 mx-auto ${className}`}
        >
            <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative bg-[#0D0A1A] border-[4px] border-black/80 dark:border-black shadow-inner">
                {/* Notch Area */}
                <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
                    <div className="w-24 h-6 bg-black rounded-b-2xl"></div>
                </div>

                {/* Dynamic Content */}
                <div className="w-full h-full relative z-10 font-sans text-white">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
