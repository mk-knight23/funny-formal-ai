# AI-VIBE-CHAT-V3: Stack Strategy

## Stack Direction

**From:** Next.js 15 + React 19 + Tailwind 4
**To:** SolidStart + SolidJS 1.8 + Panda CSS + Zustand (or Solid stores)

**Rationale:** Fine-grained reactivity, type-safe CSS, smaller bundles

---

## Core Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | SolidStart | Full-stack Solid framework |
| UI | SolidJS 1.8 | Fine-grained reactive components |
| Styling | Panda CSS | Type-safe CSS-in-JS |
| State | @solidjs/store | Nested reactivity |
| Icons | solid-icons | Icon library |
| Animation | @motionone/solid | Animations |

---

## Panda CSS Configuration

```typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          matrix: { value: '#00ff41' },
          terminal: { value: '#0c0c0c' },
          amber: { value: '#ffb000' }
        }
      }
    }
  },
  outdir: 'styled-system'
})
```

---

## Styling Strategy

**Theme:** "Cyberpunk Retro Terminal"

- Dark terminal background (#0c0c0c)
- Matrix green text (#00ff41)
- Amber accents (#ffb000)
- Monospace fonts (JetBrains Mono)
- CRT scanline effects
- Blinking cursor

---

## Key Differences

| Aspect | V1 (Vue) | V2 (Svelte) | V3 (Solid) |
|--------|----------|-------------|------------|
| Reactivity | Vue refs | Svelte runes | Solid signals |
| DOM | Virtual | No virtual | No virtual |
| Templates | Vue | Svelte | JSX |
| Bundle | Medium | Small | Smallest |
| Theme | Glass | Minimalist | Cyberpunk |
