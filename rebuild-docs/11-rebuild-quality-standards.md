# AI-VIBE-CHAT-V3: Quality Standards

## Build Requirements

- [ ] `npm run build` passes
- [ ] Panda CSS generates correctly
- [ ] No TypeScript errors
- [ ] Bundle size < 200 KB

## Lint Rules

```javascript
// eslint.config.js
export default {
  rules: {
    'solid/no-react-specific-props': 'error',
    'solid/components-return-once': 'error',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
```

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase.tsx | Terminal.tsx |
| Signals | camelCase | messages |
| Stores | camelCaseStore | chatStore |
| Styles | panda recipe | buttonRecipe |

## Performance Goals

| Metric | Target |
|--------|--------|
| Bundle size | < 200 KB |
| First paint | < 1.5s |
| Signal update | < 1ms |

## Accessibility

- Keyboard-only navigation (terminal style)
- High contrast cyberpunk theme
- Reduced motion support
- Screen reader announcements
