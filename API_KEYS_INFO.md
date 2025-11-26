# 🔑 API Keys Configuration

## Hardcoded API Keys

The following API keys have been hardcoded into the application for immediate use:

### 1. AgentRouter
```
sk-UoCbOsndAWqpFuTjxJZGMgLWf93c1lCpmp01OLxQYXKyzxvgsk-lEcEQPK5UnJ3pO4s0NXVGcDEEHGAO8po4gR6JGgdDrAnWvtW2
```

### 2. MegaLLM
```
sk-mega-0eaa0b2c2bae3ced6afca8651cfbbce07927e231e4119068f7f7867c20cdc8203
```

### 3. OpenRouter
```
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
```

### 4. Routeway
```
sk-LeRlb8aww5YXvdP57hnVw07xmIA2c3FvfeLvPhbmFU14osMn
```

## How It Works

### Automatic Configuration
- API keys are hardcoded in `src/lib/multi-providers.ts`
- They are automatically used when no custom keys are provided
- Users can still override them in Settings if needed

### Priority Order
1. **User's custom keys** (from Settings dialog)
2. **Hardcoded default keys** (automatic fallback)
3. **Environment variables** (for Groq only)

### Usage
- No configuration needed - just start using!
- All providers work out of the box
- Settings dialog still available for custom keys

## Security Note

⚠️ **Important:** These keys are embedded in the client-side code and visible to anyone who inspects the application. This is acceptable for:
- Personal projects
- Development/testing
- Demo applications
- Non-sensitive use cases

For production applications with sensitive data, consider:
- Using environment variables
- Implementing server-side key management
- Setting up proper authentication
- Using API key rotation

## Testing

### Quick Test
1. Open the app: http://localhost:3001
2. Select any model from any provider
3. Ask a question
4. It should work immediately!

### Verify Keys
- Open Settings (⚙️)
- Check each provider tab
- Keys should be pre-filled
- You can test or replace them

## Provider Status

| Provider | Key Status | Auto-Working |
|----------|------------|--------------|
| **Groq** | .env.local | ✅ Yes |
| **AgentRouter** | Hardcoded | ✅ Yes |
| **MegaLLM** | Hardcoded | ✅ Yes |
| **OpenRouter** | Hardcoded | ✅ Yes |
| **Routeway** | Hardcoded | ✅ Yes |

## Benefits

### For Users
✅ Zero configuration needed
✅ Works immediately
✅ All providers available
✅ Can still customize keys

### For Developers
✅ Easy testing
✅ Quick demos
✅ No setup friction
✅ Flexible override

## Customization

### Override Keys
Users can still add their own keys:
1. Click ⚙️ Settings
2. Select provider tab
3. Enter custom API key
4. Save settings
5. Custom key takes precedence

### Remove Hardcoded Keys
To remove hardcoded keys (for production):
1. Edit `src/lib/multi-providers.ts`
2. Clear `DEFAULT_API_KEYS` object
3. Rebuild application
4. Users must provide their own keys

## Code Location

### Hardcoded Keys
```typescript
// src/lib/multi-providers.ts
const DEFAULT_API_KEYS: APIKeyConfig = {
  agentrouter: 'sk-UoCb...',
  megallm: 'sk-mega-...',
  openrouter: 'sk-or-v1-...',
  routeway: 'sk-LeRl...'
};
```

### Key Retrieval
```typescript
export function getStoredApiKeys(): APIKeyConfig {
  // Returns merged keys (user + defaults)
  return { ...DEFAULT_API_KEYS, ...storedKeys };
}
```

## Monitoring

### Check Usage
- Visit each provider's dashboard
- Monitor API usage
- Check rate limits
- Review costs (for paid providers)

### Provider Dashboards
- **AgentRouter:** https://agentrouter.org/dashboard
- **MegaLLM:** https://megallm.io/dashboard
- **OpenRouter:** https://openrouter.ai/dashboard
- **Routeway:** https://routeway.ai/dashboard

## Troubleshooting

### Keys Not Working
1. Check provider status page
2. Verify key format
3. Check rate limits
4. Try different model
5. Check console for errors

### Override Not Working
1. Clear browser cache
2. Clear localStorage
3. Re-enter custom key
4. Hard refresh page
5. Check browser console

## Best Practices

### For Development
✅ Use hardcoded keys for quick testing
✅ Monitor usage regularly
✅ Rotate keys periodically
✅ Keep keys in version control (if private repo)

### For Production
✅ Use environment variables
✅ Implement server-side proxy
✅ Add authentication
✅ Monitor and limit usage
✅ Never expose keys in public repos

---

**Status:** ✅ All keys configured and working
**Last Updated:** November 26, 2024
**Version:** 3.0.0
