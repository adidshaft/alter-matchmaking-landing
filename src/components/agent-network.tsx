"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export function AgentNetwork() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(null);

    // Initialize nodes only on client
    useEffect(() => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;

        // Reduce node count on smaller screens
        const nodeCount = clientWidth < 768 ? 15 : 30;

        const initialNodes = Array.from({ length: nodeCount }).map((_, i) => ({
            id: i,
            x: Math.random() * clientWidth,
            y: Math.random() * clientHeight,
            vx: (Math.random() - 0.5) * 0.5, // Slow drifting speed
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 4 + 2, // Size between 2px and 6px
        }));

        setNodes(initialNodes);
    }, []);

    // Animation Loop
    const animate = () => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;

        setNodes(prevNodes =>
            prevNodes.map(node => {
                let { x, y, vx, vy } = node;

                // Bounce off walls
                if (x <= 0 || x >= clientWidth) vx *= -1;
                if (y <= 0 || y >= clientHeight) vy *= -1;

                return {
                    ...node,
                    x: x + vx,
                    y: y + vy,
                    vx,
                    vy
                };
            })
        );

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    // Calculate connections distances (only connect if close enough)
    const getConnectionDistance = () => typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 150;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
            {/* Draw Lines */}
            <svg className="absolute inset-0 w-full h-full">
                {nodes.map((node, i) =>
                    nodes.slice(i + 1).map(otherNode => {
                        const dx = node.x - otherNode.x;
                        const dy = node.y - otherNode.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const maxDistance = getConnectionDistance();

                        if (distance < maxDistance) {
                            const opacity = 1 - (distance / maxDistance);
                            return (
                                <line
                                    key={`${node.id}-${otherNode.id}`}
                                    x1={node.x} y1={node.y}
                                    x2={otherNode.x} y2={otherNode.y}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-alter-purple/30 dark:text-alter-lightpurple/30"
                                    opacity={opacity}
                                />
                            );
                        }
                        return null;
                    })
                )}
            </svg>

            {/* Draw Nodes */}
            {nodes.map(node => (
                <motion.div
                    key={node.id}
                    className="absolute rounded-full bg-alter-purple dark:bg-alter-lightpurple"
                    style={{
                        left: node.x,
                        top: node.y,
                        width: node.size,
                        height: node.size,
                        marginLeft: -node.size / 2,
                        marginTop: -node.size / 2,
                        boxShadow: `0 0 ${node.size * 2}px var(--alter-purple)`,
                    }}
                    animate={{
                        opacity: [0.3, 0.8, 0.3], // Subtle pulsing effect on the dots
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
