<context>
You are an elite Frontend Engineer and Web Designer. We are completely overhauling the `Alter` website (a Human-Only AI-Agent matchmaking ecosystem) to a hyper-premium, hyper-modern state. The primary inspiration for this aesthetic is the **Shopify Editions Winter 2026** site.
</context>

<high_level_objective>
Completely pivot the technical engine and aesthetic of the current website to match the Shopify Editions reference. This involves ripping out standard scrolling for a momentum-based engine, massive architectural layout changes (sticky stacking), and a completely new unified Light/Dark mode design system utilizing official iOS Glassmorphism.
</high_level_objective>

<technical_requirements>
### 1. Engine Pivot: Smooth Scrolling & Physics
*   **Momentum Scroll:** Implement `@studio-freight/react-lenis` across the entire application root. Unlocking buttery-smooth, hardware-accelerated momentum scrolling natively across the entire DOM is mandatory.
*   **Kinetic 3D Interactivity:** Tie `window.scrollY` directly into the `@react-three/fiber` `useFrame` request hook inside the `InteractiveBackground.tsx` (or whatever naming convention exists for the WebGL background). WebGL geometric shapes and particle starfields must dynamically rotate, parallax, and react to scroll velocity rather than just floating aimlessly.

### 2. Architectural Layout Revamp
*   **Sticky Stacking Context:** Rewrite the main page layout entirely (`page.tsx`). Remove all standard relative scrolling sections.
*   Every cinematic "Scene" (e.g., Hero, Digital Soul, Simulation, Mechanics) must use `sticky top-0 h-screen` overlapping layouts. As the user scrolls down, each section elegantly slides up and pins over the last piece of content.
*   **Remove Clutter:** Completely rip out the Roman Numeral sidebar or any older navigation elements that break the clean, wide, cinematic full-bleed feel of the Shopify reference.
*   **Fix Z-Index & Clipping:** Ensure absolutely no `overflow-hidden` constraints exist on main structural containers. Hover tooltips, Agent Dossier modals, and popups must seamlessly break out of their parent bounds without being visually cropped.

### 3. Typography & Copywriting
*   **Massive Grotesque Typography:** Abandon traditional Serif headers across the layout. Swap exclusively to massive, negative-tracking `font-sans` (e.g., Inter, Outfit, Roboto) `font-black` headers pushing `15vw` to `20vw` for maximum brutalist impact. Keep Serif (`Cormorant Garamond` or similar) strictly restricted to elegant italic body copy or subtle accents to create extreme contrast.
*   **Narrative Polish:** Keep the copy consumer-focused. Completely strip out any internal engineering terminology (e.g., "Phase 18", "Model Adjustment", "Live Topology").
*   **Official App Store Button:** Replace all generic CTA download buttons with the official SVG "Download on the App Store" badge from Apple.

### 4. Color Palette & iOS Glassmorphism
*   **Auto-Detecting System Themes:** Use `next-themes` with `enableSystem` and `defaultTheme="system"` so the UI automatically detects and honors the user's OS preference on load.
*   **Bright Light Mode:** Implement a pristine Light Theme. Base backgrounds must shift to `#F1EFED` (off-white parchment) while primary typography snaps to `#333333` (deep charcoal). Mixing in subtle hints of Obsidian and Deep Purple from the internal app's palette as accents.
*   **Dark Mode:** Utilize deep blacks (`#000000`) and pure whites (`#FFFFFF`).
*   **Official iOS Glassmorphism:** Re-architect all `.glass` Tailwind utilities. Move away from generic tech-blur to official Apple ultra-thin materials. Implement `backdrop-filter: blur(40px) saturate(180%)` with delicate inner `box-shadow` to mimic the light reflection found natively in iOS modals. It must look stunning and highly legible against both the `#F1EFED` light background and `#000000` dark background.
</technical_requirements>

<instructions>
1.  **Analyze current architecture:** Review `layout.tsx`, `page.tsx`, `globals.css`, and any WebGL background components.
2.  **Install & Setup ReactLenis:** Inject it heavily at the root layout state.
3.  **Refactor Typography & Colors:** Aggressively update `globals.css` with the new themes (`#F1EFED` and `#333333`), massive scaling font utilities (`15vw`), and the official iOS `glass` variables. Ensure `next-themes` is set to system default.
4.  **Implement Sticky Stacking Layout:** Redo `page.tsx` structural flow entirely.
5.  **Refactor Modals & Tooltips:** Test hovering on the Agent Network graph and ensure no UI gets abruptly cropped by parent containers.
6.  **Review the Content:** Manually sweep all text arrays and paragraphs, removing backend terminology. Inject the Apple SVG button.
</instructions>
