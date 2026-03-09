"use client";

import React, { useRef, useEffect, useState } from "react";

export function ScrollVideoBackground() {
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);
    const [opacity1, setOpacity1] = useState(1);
    const [opacity2, setOpacity2] = useState(0);

    useEffect(() => {
        // Force browsers to load the video frame data so we can scrub
        const v1 = video1Ref.current;
        const v2 = video2Ref.current;
        if (v1) {
            v1.load();
            v1.play().then(() => v1.pause()).catch(() => { });
        }
        if (v2) {
            v2.load();
            v2.play().then(() => v2.pause()).catch(() => { });
        }

        const onScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;

            const progress = scrollY / docHeight; // 0 → 1

            // Video 1 scrubs from 0 → 50% scroll
            if (v1 && v1.readyState >= 2 && v1.duration > 0) {
                const t1 = Math.min(Math.max(progress * 2, 0), 1);
                v1.currentTime = t1 * v1.duration;
            }
            // Video 2 scrubs from 50% → 100% scroll
            if (v2 && v2.readyState >= 2 && v2.duration > 0) {
                const t2 = Math.min(Math.max((progress - 0.5) * 2, 0), 1);
                v2.currentTime = t2 * v2.duration;
            }

            // Cross-fade: video 1 out at 40-60%, video 2 in
            const fade = Math.min(Math.max((progress - 0.4) / 0.2, 0), 1);
            setOpacity1(1 - fade);
            setOpacity2(fade);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // run once on mount

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 w-full h-full bg-black pointer-events-none overflow-hidden">
            {/* Video 1: renaissance_hero_bg → renaissance_hero_bg_1 */}
            <video
                ref={video1Ref}
                src="/images/The_first_one_is_the_hero_section_used_in_the_webs_5e204b2d18.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                style={{
                    opacity: opacity1,
                    transition: "opacity 0.1s linear",
                }}
            />
            {/* Video 2: renaissance_hero_bg_1 → renaissance_connection */}
            <video
                ref={video2Ref}
                src="/images/Website_assets_used_on_website_8a8e1fe056.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                style={{
                    opacity: opacity2,
                    transition: "opacity 0.1s linear",
                }}
            />
            {/* Subtle dark overlay so foreground text remains readable */}
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.83)" }} />
        </div>
    );
}
