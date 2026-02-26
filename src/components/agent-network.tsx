"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3-force';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

interface Node {
    id: string;
    group: number;
    radius: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    name: string;
    vibe: string;
    strategy: string;
    intent: string; // NEW: The explicit intent
}

interface Link {
    source: string | Node;
    target: string | Node;
}

export function AgentNetwork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [links, setLinks] = useState<Link[]>([]);
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

    const rawNodes = useMemo(() => [
        { id: "042", group: 1, radius: 25, name: "The Quiet Architect", vibe: "Introspective", strategy: "Seeking intellectual depth", intent: "Deeply Committed" },
        { id: "089", group: 2, radius: 20, name: "The Vibrant Explorer", vibe: "Eclectic", strategy: "Filtering for adventurous spirits", intent: "Something Fun" },
        { id: "112", group: 1, radius: 22, name: "The Grounded Muse", vibe: "Warm", strategy: "Prioritizing emotional availability", intent: "Long Term Love" },
        { id: "007", group: 3, radius: 28, name: "The Sharp Strategist", vibe: "Precise", strategy: "Parsing ambition and drive", intent: "Power Couple" },
        { id: "055", group: 2, radius: 24, name: "The Deep Thinker", vibe: "Philosophical", strategy: "Evaluating core beliefs", intent: "Soulmate Search" },
        { id: "023", group: 3, radius: 21, name: "The Gentle Observer", vibe: "Empathetic", strategy: "Sensing attachment styles", intent: "Healing Connection" },
        { id: "099", group: 1, radius: 26, name: "The Bold Creator", vibe: "Expressive", strategy: "Matching energetic resonance", intent: "Creative Partner" },
        { id: "314", group: 2, radius: 22, name: "The Relentless Seeker", vibe: "Driven", strategy: "Optimizing for shared life goals", intent: "Building an Empire" },
        { id: "888", group: 3, radius: 24, name: "The Stoic Defender", vibe: "Protective", strategy: "Testing loyalty boundaries", intent: "Fierce Loyalty" },
        { id: "101", group: 1, radius: 18, name: "The Playful Rogue", vibe: "Mischievous", strategy: "Seeking quick wit and banter", intent: "Electric Chemistry" },
        { id: "777", group: 2, radius: 25, name: "The Spiritual Guide", vibe: "Ethereal", strategy: "Harmonizing aura frequencies", intent: "Karmic Bond" },
        { id: "256", group: 3, radius: 27, name: "The Logical Analyst", vibe: "Rational", strategy: "Computing long-term viability", intent: "Calculated Success" },
        { id: "512", group: 1, radius: 20, name: "The Hopeless Romantic", vibe: "Passionate", strategy: "Searching for cinematic moments", intent: "Fairy Tale" },
        { id: "128", group: 2, radius: 23, name: "The Urban Nomad", vibe: "Restless", strategy: "Aligning travel preferences", intent: "Wanderlust Collab" },
        { id: "064", group: 3, radius: 19, name: "The Comfort Provider", vibe: "Cozy", strategy: "Ensuring domestic tranquility", intent: "Peaceful Home" },
        { id: "032", group: 1, radius: 26, name: "The Avant-Garde", vibe: "Unconventional", strategy: "Rejecting societal norms", intent: "Rebellious Union" },
        { id: "016", group: 2, radius: 21, name: "The Purist", vibe: "Refined", strategy: "Filtering for exquisite taste", intent: "High Society" },
        { id: "008", group: 3, radius: 22, name: "The Catalyst", vibe: "Dynamic", strategy: "Igniting sudden change", intent: "Transformative Era" },
        { id: "004", group: 1, radius: 25, name: "The Anchor", vibe: "Steadfast", strategy: "Providing unwavering support", intent: "Rock Solid Foundation" },
        { id: "002", group: 2, radius: 24, name: "The Charmer", vibe: "Magnetic", strategy: "Drawing intense devotion", intent: "All Consuming" },
        { id: "001", group: 3, radius: 30, name: "The Oracle", vibe: "Omniscient", strategy: "Overseeing network synchrony", intent: "Perfect Alignment" }
    ], []);

    const rawLinks = useMemo(() => [
        { source: "042", target: "112" }, { source: "089", target: "099" },
        { source: "007", target: "042" }, { source: "055", target: "023" },
        { source: "112", target: "055" }, { source: "023", target: "089" },
        { source: "099", target: "007" }, { source: "042", target: "055" },
        { source: "314", target: "112" }, { source: "888", target: "023" },
        { source: "101", target: "089" }, { source: "777", target: "055" },
        { source: "256", target: "007" }, { source: "512", target: "099" },
        { source: "128", target: "089" }, { source: "064", target: "112" },
        { source: "032", target: "099" }, { source: "016", target: "007" },
        { source: "008", target: "101" }, { source: "004", target: "064" },
        { source: "002", target: "512" }, { source: "001", target: "007" },
        { source: "001", target: "112" }, { source: "001", target: "089" },
        { source: "314", target: "256" }, { source: "777", target: "512" },
        { source: "023", target: "064" }, { source: "101", target: "128" }
    ], []);

    useEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Distribute nodes randomly within the container
        const initNodes = rawNodes.map(n => ({
            ...n,
            x: width / 2 + (Math.random() - 0.5) * 200,
            y: height / 2 + (Math.random() - 0.5) * 200
        }));

        // Bouncy Physics System
        const simulation = d3.forceSimulation<Node>(initNodes)
            .force('link', d3.forceLink<Node, Link>(rawLinks).id(d => d.id).distance(120).strength(0.5)) // Springs holding them together
            .force('charge', d3.forceManyBody().strength(-400)) // Pushing each other away
            .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05)) // Gentle pull to center
            .force('collision', d3.forceCollide<Node>().radius((d) => d.radius + 15).iterations(2).strength(0.8)) // Bouncy collision
            .force('x', d3.forceX(width / 2).strength(0.05))
            .force('y', d3.forceY(height / 2).strength(0.05))
            .velocityDecay(0.4) // Makes it feel more fluid/liquid
            .on('tick', () => {
                setNodes([...simulation.nodes()]);

                const linkEls = simulation.force<d3.ForceLink<Node, Link>>('link')?.links();
                if (linkEls) {
                    setLinks([...linkEls]);
                }
            });

        // Make it endlessly "float" and jiggle
        const interval = setInterval(() => {
            simulation.alpha(0.1).restart();
        }, 2000);

        return () => {
            simulation.stop();
            clearInterval(interval);
        };
    }, [rawNodes, rawLinks]);

    return (
        <div className="relative w-full h-full min-h-[500px]" ref={containerRef}>

            {/* Dynamic Connections (Victorian Gold/Brass) */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
                {links.map((link, i) => {
                    const source = link.source as Node;
                    const target = link.target as Node;
                    if (source.x === undefined || target.x === undefined) return null;

                    return (
                        <motion.line
                            key={i}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="rgba(212, 175, 55, 0.4)" // Stronger Renaissance Gold links
                            strokeWidth="1.5"
                            className="drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                        />
                    );
                })}
            </svg>

            {/* Interactive Orbs */}
            {nodes.map((node) => {
                if (node.x === undefined || node.y === undefined) return null;

                const isHovered = hoveredNode?.id === node.id;

                // Elegant Victorian Color Mapping (Gold, Burgundy, Emerald/Jade)
                const styling = node.group === 1
                    ? { border: 'border-alter-gold', bg: 'bg-alter-gold/10', text: 'text-alter-gold', shadow: 'shadow-[0_0_20px_rgba(212,175,55,0.4)]' }
                    : node.group === 2
                        ? { border: 'border-alter-burgundy', bg: 'bg-alter-burgundy/10', text: 'text-alter-burgundy', shadow: 'shadow-[0_0_20px_rgba(74,14,23,0.4)]' }
                        : { border: 'border-[#4A5D4E]', bg: 'bg-[#4A5D4E]/10', text: 'text-[#4A5D4E]', shadow: 'shadow-[0_0_20px_rgba(74,93,78,0.4)]' };

                return (
                    <div
                        key={node.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 ${isHovered ? 'z-50' : 'z-10'}`}
                        style={{ left: node.x, top: node.y }}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        {/* The Orb - Glassmorphic Victorian Lens */}
                        <motion.div
                            layoutId={`node-${node.id}`}
                            className={`rounded-full border-2 cursor-pointer flex items-center justify-center backdrop-blur-xl transition-all duration-300 ${styling.border} ${styling.bg} ${styling.text} ${styling.shadow}`}
                            style={{
                                width: node.radius * 2,
                                height: node.radius * 2,
                                boxShadow: isHovered ? `0 0 30px ${styling.border.replace('border-', '')}80, inset 0 0 20px rgba(255,255,255,0.5)` : `inset 0 0 10px rgba(255,255,255,0.2)`
                            }}
                            animate={{
                                scale: isHovered ? 1.4 : 1,
                            }}
                            whileHover={{ scale: 1.4 }}
                        >
                            <BrainCircuit size={node.radius * 0.9} strokeWidth={1.5} opacity={0.9} />
                        </motion.div>

                        {/* Hover Expansion Card (The Dossier) - Victorian Glass Style */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 35, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.2 } }}
                                    className="absolute left-1/2 -translate-x-1/2 w-80 p-6 rounded-2xl glass border !border-alter-gold/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] pointer-events-none z-[100] flex flex-col gap-4 before:absolute before:inset-1 before:border before:border-alter-gold/10 before:rounded-xl"
                                    style={{
                                        top: node.radius,
                                        background: 'linear-gradient(135deg, rgba(253, 251, 247, 0.9) 0%, rgba(239, 236, 230, 0.95) 100%)',
                                        color: '#1A1A1A'
                                    }}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-alter-charcoal/60">Agent {node.id}</span>
                                        {/* The Intent Badge - Ornate */}
                                        <span className="text-[9px] font-bold px-3 py-1 rounded-sm bg-alter-charcoal text-alter-ivory uppercase tracking-widest shadow-md border border-alter-gold/30">
                                            {node.intent}
                                        </span>
                                    </div>

                                    <h4 className="font-serif text-3xl leading-none font-medium text-alter-charcoal relative z-10">{node.name}</h4>

                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-alter-gold/50 to-transparent my-1 relative z-10" />

                                    <div className="flex items-center gap-3 relative z-10">
                                        <span className="text-[10px] uppercase font-mono tracking-widest text-alter-charcoal/50">Resonance:</span>
                                        <span className="text-xs font-serif italic px-3 py-1 rounded bg-black/5 border border-black/10 text-alter-charcoal">{node.vibe}</span>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mt-2 relative z-10">
                                        <span className="text-[10px] uppercase font-mono tracking-widest text-alter-charcoal/50">Directive:</span>
                                        <span className="text-sm leading-relaxed font-serif text-alter-charcoal/90 italic">&ldquo;{node.strategy}&rdquo;</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
