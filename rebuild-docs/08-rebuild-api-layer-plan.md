# AI-VIBE-CHAT-V3: API Layer Plan

## API Architecture

**Pattern:** SolidStart API Routes
**Approach:** HTTP methods in route files

---

## API Routes

| Route | Method | Handler |
|-------|--------|---------|
| `/api/chat` | POST | POST function |
| `/api/providers` | GET | GET function |

---

## SolidStart API Example

```tsx
// src/routes/api/chat.ts
import { APIEvent } from '@solidjs/start/server'

export async function POST(event: APIEvent) {
  const body = await event.request.json()
  const { message, provider } = body

  const adapter = getAdapter(provider)
  const stream = adapter.stream({ message })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
```

---

## Streaming with Solid

```tsx
import { createSignal, createResource } from 'solid-js'

function Chat() {
  const [message, setMessage] = createSignal('')

  const sendMessage = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: message() })
    })

    const reader = response.body?.getReader()
    while (reader) {
      const { done, value } = await reader.read()
      if (done) break
      // Update signal directly
      setStreamedContent(prev => prev + new TextDecoder().decode(value))
    }
  }

  return <div>{streamedContent()}</div>
}
```
