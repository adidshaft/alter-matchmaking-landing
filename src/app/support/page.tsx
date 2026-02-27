"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SupportPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [honeypot, setHoneypot] = useState(''); // Spam protection trick
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Spam bot check
        if (honeypot.trim() !== '') {
            console.warn("Spam detected");
            return;
        }

        if (!email || !message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Cooldown check
        const lastSubmission = localStorage.getItem('alter_support_last_submission');
        if (lastSubmission) {
            const timeSince = Date.now() - parseInt(lastSubmission, 10);
            if (timeSince < 60000 * 5) { // 5 minutes
                toast.error("You are submitting too fast. Please wait a few minutes.");
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('support_feedback')
                .insert([{ email, message }]);

            if (error) {
                console.error(error);
                toast.error("Failed to submit feedback. Ensure the database table exists.");
            } else {
                toast.success("Message gracefully received. The Bureau will review it shortly.");
                localStorage.setItem('alter_support_last_submission', Date.now().toString());
                setEmail('');
                setMessage('');
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected disruption occurred in the network.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-alter-purple/30 flex flex-col justify-center items-center px-4 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-alter-gold/[0.04] rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-alter-purple/[0.03] rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 w-full max-w-lg mb-8">
                <Link href="/" className="text-white/40 hover:text-white transition-colors font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
                    <span>←</span> Return
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-lg glass rounded-[2.5rem] p-8 md:p-12 border border-white/[0.06] shadow-2xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 bg-white/[0.12]" />
                        <span className="text-alter-gold font-mono text-[10px] tracking-[0.3em] uppercase">The Alter Bureau</span>
                        <div className="h-px w-8 bg-white/[0.12]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight text-white mb-4">
                        Support & Feedback
                    </h1>
                    <p className="text-white/40 font-sans text-sm leading-relaxed">
                        Report anomalies or provide guidance on improving the network. We process all transmissions.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Honeypot field - hidden from real users */}
                    <input
                        type="text"
                        name="first_name_verify"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="opacity-0 absolute -left-[9999px]"
                    />

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 ml-4">
                            Identity (Email)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-alter-gold/50 focus:bg-white/[0.05] transition-all disabled:opacity-50 font-sans text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 ml-4">
                            Transmission (Message)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue or feedback..."
                            rows={5}
                            disabled={isSubmitting}
                            required
                            className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-alter-gold/50 focus:bg-white/[0.05] transition-all disabled:opacity-50 font-sans text-sm resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !email || !message}
                        className="mt-4 w-full bg-white text-black font-semibold rounded-2xl hover:bg-white/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center px-4 py-4 text-sm shadow-[0_0_30px_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        {isSubmitting ? (
                            <Loader2 size={18} className="animate-spin text-black" />
                        ) : (
                            "Initate Transmission"
                        )}
                    </button>
                </form>
            </div>

        </main>
    );
}
