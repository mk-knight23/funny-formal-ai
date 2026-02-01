# AI-VIBE-CHAT-V3: Target Architecture

## Architecture Overview

**Pattern:** SolidStart with Fine-Grained Reactivity
**Approach:** Signals-based state with Panda CSS styling
**Paradigm:** Functional components with reactive primitives

---

## Layer Architecture

### 1. UI Layer (Solid Components)

**Responsibility:** Render UI with fine-grained updates

**Pattern:**
- Function components returning JSX
- Signals for state (`createSignal`)
- Memos for derived state (`createMemo`)
- Effects for side effects (`createEffect`)

### 2. State Layer (Signals + Stores)

**Responsibility:** Reactive state management

**Pattern:**
- `createSignal` for local state
- `createStore` for nested state
- Context for dependency injection

### 3. API Layer (SolidStart)

**Responsibility:** API routes with SolidStart

**Pattern:**
- `APIEvent` handlers
- Server-side functions
- File-based routing

### 4. Styling Layer (Panda CSS)

**Responsibility:** Type-safe CSS-in-JS

**Pattern:**
- `styled` API for components
- `css` function for one-off styles
- Recipe system for variants

---

## Solid Primitives Pattern

```tsx
import { createSignal, createMemo, createEffect } from 'solid-js'

function ChatComponent() {
  // Signal (reactive state)
  const [messages, setMessages] = createSignal<Message[]>([])

  // Memo (derived state)
  const messageCount = createMemo(() => messages().length)

  // Effect (side effect)
  createEffect(() => {
    console.log('Messages updated:', messages())
  })

  return <div>{messageCount()} messages</div>
}
```

---

## Fine-Grained Reactivity Benefits

- Components render once, signals update independently
- No virtual DOM overhead
- Automatic dependency tracking
- Smaller bundle size than React
