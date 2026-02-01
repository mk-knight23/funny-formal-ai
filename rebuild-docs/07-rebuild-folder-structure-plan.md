# AI-VIBE-CHAT-V3: Folder Structure Plan

## SolidStart Structure

```
src/
├── components/          # Solid components
│   ├── terminal/
│   │   ├── Terminal.tsx
│   │   ├── TerminalInput.tsx
│   │   ├── TerminalOutput.tsx
│   │   └── StatusBar.tsx
│   ├── chat/
│   │   ├── Message.tsx
│   │   └── MessageList.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Dialog.tsx
│       └── Input.tsx
├── routes/              # SolidStart routes
│   ├── index.tsx        # Home/chat
│   ├── api/
│   │   ├── chat.ts      # API route
│   │   └── providers.ts
│   └── settings.tsx
├── stores/              # Solid stores
│   ├── chatStore.ts
│   ├── settingsStore.ts
│   └── providerStore.ts
├── providers/           # LLM adapters
│   ├── groq.ts
│   ├── openrouter.ts
│   ├── routeway.ts
│   ├── megallm.ts
│   └── agentrouter.ts
├── utils/               # Utilities
│   ├── constants.ts
│   ├── helpers.ts
│   └── types.ts
├── styles/              # Global styles
│   └── global.css
└── app.tsx              # Root component
```

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase.tsx | Terminal.tsx |
| Routes | lowercase.ts | index.tsx |
| Stores | camelCase.ts | chatStore.ts |
| Utils | camelCase.ts | helpers.ts |
