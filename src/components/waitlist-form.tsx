"use client";

import React, { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function WaitlistForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique violation
                    toast.error("You're already on the waitlist!");
                } else {
                    console.error(error);
                    toast.error("Failed to join waitlist. Please try again.");
                }
            } else {
                toast.success("Successfully joined the Alter waitlist!");
                setEmail('');
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto relative max-w-sm rounded-full bg-white/5 border border-white/10 p-1.5 focus-within:border-white/30 transition-colors shadow-2xl">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isSubmitting}
                required
                className="w-full px-5 py-3.5 rounded-full bg-transparent text-white placeholder:text-white/40 focus:outline-none transition-colors disabled:opacity-50 font-sans text-sm"
            />
            <button
                type="submit"
                disabled={isSubmitting || !email}
                className="min-w-[120px] bg-white text-black font-semibold rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center px-4 py-2 text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
                {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin text-black" />
                ) : (
                    "Join Waitlist"
                )}
            </button>
        </form>
    );
}
