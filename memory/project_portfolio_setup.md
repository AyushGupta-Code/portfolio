---
name: Magic Portfolio – Ayush's setup
description: Key decisions made when customising magic-portfolio for Ayush Gupta (AI Engineer, Raleigh NC)
type: project
---

Ayush is building a Next.js portfolio with a "Parisian Studio" aesthetic on top of the once-ui-system/magic-portfolio template.

**Why:** Showcase his AI/audio engineering projects (Cinematic Music Generator, Novel-to-Music Pipeline, Emotional Voice Synthesizer, Narrative Intensity Analyzer) with an elegant, gallery-feel UI.

Key decisions:
- Fonts: Cormorant_Garamond (heading, italic), Lora (body), DM_Sans (label), Geist_Mono (code)
- Colors: `brand: "orange"` + `accent: "red"` as TypeScript base values — both fully overridden via CSS variables in custom.css to ochre gold (#c9840a) and terracotta (#b05c3a)
- `neutral: "sand"` for warm parchment backgrounds
- `theme: "light"`, `border: "conservative"`, `solid: "color"`, `solidStyle: "flat"`
- `Schemes` type in @once-ui-system/core does NOT include "custom" — must use a real scheme value and override via CSS
- `SameAsConfig` requires threads, linkedin, discord (all three required fields)
- Chat route lives at src/app/api/chat/route.js (JS file by user request), uses @anthropic-ai/sdk with streaming + prompt caching on the system block
- ChatSection component at src/components/ChatSection.tsx ("use client"), streamed text responses
- ANTHROPIC_API_KEY must be set in .env.local

**How to apply:** When touching the Once UI config, remember "custom" is not a valid Schemes value. CSS variable overrides in custom.css are the correct pattern for a fully custom brand palette.
