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
        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto relative max-w-xs">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Join the Waitlist..."
                disabled={isSubmitting}
                required
                className="w-full px-6 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 focus:outline-none focus:border-alter-purple transition-colors disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={isSubmitting || !email}
                className="absolute right-2 top-2 bottom-2 bg-alter-purple rounded-full hover:bg-alter-lightpurple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-[36px] h-[36px]"
            >
                {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                ) : (
                    <ChevronRight size={16} className="text-white" />
                )}
            </button>
        </form>
    );
}
