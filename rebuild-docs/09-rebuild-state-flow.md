# AI-VIBE-CHAT-V3: State Flow Design

## State Architecture

**Pattern:** Solid Signals + Stores
**Approach:** Fine-grained reactivity

---

## Data Flow

```
User Input
    ↓
Solid Component (JSX)
    ↓
createSignal / createStore
    ↓
SolidStart API Route
    ↓
Provider Stream
    ↑
Signal Update
    ↑
Fine-grained DOM Update (no virtual DOM)
```

---

## Signals vs Stores

```tsx
import { createSignal, createStore } from 'solid-js'

// Simple state - use signals
const [count, setCount] = createSignal(0)

// Complex nested state - use store
const [state, setState] = createStore({
  messages: [],
  settings: {
    theme: 'cyberpunk',
    provider: 'groq'
  }
})

// Update store
setState('messages', messages => [...messages, newMessage])
setState('settings', 'theme', 'dark')
```

---

## Context for DI

```tsx
// ChatContext.tsx
import { createContext, useContext } from 'solid-js'

const ChatContext = createContext()

export function ChatProvider(props) {
  const [messages, setMessages] = createSignal([])

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
```
