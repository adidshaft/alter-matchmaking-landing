"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Playful floating shapes
function GeometricObjects() {
    const torusRef = useRef<THREE.Mesh>(null);
    const icosahedronRef = useRef<THREE.Mesh>(null);
    const octahedronRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const scrollY = typeof window !== 'undefined' ? window.scrollY * 0.002 : 0;

        if (torusRef.current) {
            torusRef.current.rotation.x = Math.sin(t / 2) * 0.2 + scrollY;
            torusRef.current.rotation.y = t * 0.2 + (scrollY * 0.5);
            torusRef.current.position.y = 2 + (scrollY * 2);
        }
        if (icosahedronRef.current) {
            icosahedronRef.current.rotation.y = t * 0.1 - scrollY;
            icosahedronRef.current.rotation.z = Math.cos(t / 3) * 0.2 + (scrollY * 0.2);
            icosahedronRef.current.position.y = -2 + (scrollY * 1.5);
        }
        if (octahedronRef.current) {
            octahedronRef.current.rotation.x = t * 0.15 + (scrollY * 1.2);
            octahedronRef.current.rotation.y = Math.sin(t / 4) * 0.3 - scrollY;
            octahedronRef.current.position.y = -4 + (scrollY * 3);
        }
    });

    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh ref={torusRef} position={[-4, 2, -2]}>
                    <torusGeometry args={[1.5, 0.4, 16, 100]} />
                    <meshPhysicalMaterial
                        color="#D4AF37"
                        metalness={0.8}
                        roughness={0.2}
                        transmission={0.5}
                        thickness={0.5}
                        envMapIntensity={1}
                    />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh ref={icosahedronRef} position={[4, -2, -3]}>
                    <icosahedronGeometry args={[2, 0]} />
                    <meshPhysicalMaterial
                        color="#6B1522"
                        metalness={0.4}
                        roughness={0.3}
                        transmission={0.8}
                        thickness={1}
                        clearcoat={1}
                    />
                </mesh>
            </Float>

            <Float speed={2.5} rotationIntensity={2} floatIntensity={2}>
                <mesh ref={octahedronRef} position={[0, -4, -5]}>
                    <octahedronGeometry args={[1.5, 0]} />
                    <meshPhysicalMaterial
                        color="#4A0E17"
                        metalness={0.5}
                        roughness={0.5}
                        transmission={0.7}
                        thickness={0.8}
                    />
                </mesh>
            </Float>
        </>
    );
}

// Positions computed once at module level — stable, no impure calls during render
const STAR_COUNT = 1000;
const STAR_POSITIONS = (() => {
    const p = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
        p[i * 3] = (Math.random() - 0.5) * 20;
        p[i * 3 + 1] = (Math.random() - 0.5) * 20;
        p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
})();

function Stars() {
    const pointsRef = useRef<THREE.Points>(null);

    useFrame(() => {
        if (pointsRef.current && typeof window !== 'undefined') {
            const scrollY = window.scrollY;
            pointsRef.current.rotation.y = scrollY * 0.0005;
            pointsRef.current.rotation.x = scrollY * 0.0002;
        }
    });

    return (
        <Points ref={pointsRef} positions={STAR_POSITIONS} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#FFFFFF" // Bright white stars for Shopify contrast
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export function InteractiveBackground() {
    return (
        <div className="absolute inset-0 -z-10 bg-[var(--canvas-bg)] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} gl={{ alpha: true }}>
                {/* Cinematic Renaissance Lighting */}
                <ambientLight intensity={0.8} color="#D4AF37" />
                <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={1.5} color="#D4AF37" />
                <spotLight position={[-10, -10, -10]} angle={0.25} penumbra={1} intensity={1} color="#6B1522" />
                <pointLight position={[-5, 5, -5]} intensity={1.2} color="#D4AF37" />

                {/* Sparkles around */}
                <Sparkles count={150} scale={15} size={2.5} speed={0.3} opacity={0.4} color="#D4AF37" />

                <GeometricObjects />
                <Stars />

                {/* Let users optionally interact if we lift pointer-events-none, but keep subtle otherwise */}
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            </Canvas>
        </div>
    );
}
