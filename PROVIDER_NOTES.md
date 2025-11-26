# 📝 Provider Configuration Notes

## Important Information

### Model IDs
Each provider uses different model ID formats. The model IDs in this app are configured based on each provider's API documentation.

### Provider-Specific Notes

#### Groq
- ✅ **Status:** Fully tested and working
- **API Key:** Get from https://console.groq.com
- **Models:** All Groq models use their official IDs
- **Speed:** Fastest inference available
- **Note:** Server-side API key in `.env.local` works automatically

#### OpenRouter
- ✅ **Status:** Configured (requires testing with API key)
- **API Key:** Get from https://openrouter.ai
- **Models:** Use OpenRouter's model ID format
- **Special:** Requires `HTTP-Referer` header (automatically added)
- **Note:** Many free models available

#### Routeway
- ⚠️ **Status:** Configured (model IDs may need verification)
- **API Key:** Get from https://routeway.ai
- **Models:** Updated to use common model IDs
- **Note:** Check their documentation for current available models
- **Tip:** If a model doesn't work, check https://routeway.ai/docs for current model list

#### MegaLLM
- ⚠️ **Status:** Configured (requires API key and payment)
- **API Key:** Get from https://megallm.io
- **Models:** Premium access to latest versions
- **Note:** Paid service, requires credits

#### AgentRouter
- ⚠️ **Status:** Configured (requires testing with API key)
- **API Key:** Get from https://agentrouter.org
- **Models:** Includes Claude access
- **Note:** Check their docs for current model availability

## 🔧 Troubleshooting

### "Model not found" Error

If you see an error like:
```
Model with id 'xxx' was not found
```

**Solutions:**
1. **Check Provider Documentation**
   - Visit the provider's website
   - Look for their model list/documentation
   - Verify the exact model ID format

2. **Update Model IDs**
   - Edit `src/lib/multi-providers.ts`
   - Find the provider section
   - Update the model `id` field with correct value

3. **Try Different Model**
   - Some models may be deprecated
   - Try another model from the same provider
   - Check provider's status page

4. **Verify API Key**
   - Ensure API key is correct
   - Check if key has necessary permissions
   - Verify key has credits/quota

### Updating Model Lists

To update models for a provider:

```typescript
// In src/lib/multi-providers.ts
routeway: {
  // ... provider config
  models: [
    { 
      id: 'correct-model-id',  // ← Update this
      name: 'Model Name',
      description: 'Description',
      provider: 'Provider',
      supported: true,
      free: true,
      contextWindow: 128000
    },
    // Add more models...
  ]
}
```

### Testing New Providers

1. Add API key in Settings
2. Select a model from that provider
3. Send a test message
4. Check browser console for errors
5. If error, check model ID format
6. Update configuration if needed

## 📚 Provider Documentation Links

- **Groq:** https://console.groq.com/docs
- **OpenRouter:** https://openrouter.ai/docs
- **Routeway:** https://routeway.ai/docs
- **MegaLLM:** https://megallm.io/docs
- **AgentRouter:** https://agentrouter.org/docs

## 🎯 Recommended Testing Order

1. **Start with Groq** (most reliable, already configured)
2. **Try OpenRouter** (many free models, well-documented)
3. **Test AgentRouter** (Claude access)
4. **Try Routeway** (may need model ID updates)
5. **Test MegaLLM** (if you have paid account)

## 💡 Tips

### For Users
- Start with Groq (fastest and most reliable)
- Keep multiple provider API keys configured
- If one provider fails, try another
- Check provider status pages if issues persist

### For Developers
- Model IDs can change over time
- Always check provider documentation
- Add error handling for model changes
- Consider adding model validation
- Log errors for debugging

## 🔄 Keeping Models Updated

Providers may:
- Add new models
- Deprecate old models
- Change model IDs
- Update API formats

**To stay updated:**
1. Subscribe to provider newsletters
2. Check their changelog/blog
3. Monitor API responses
4. Update configuration as needed

## 🆘 Getting Help

If you encounter issues:

1. **Check Console Errors**
   - Open browser DevTools (F12)
   - Look at Console tab
   - Note the exact error message

2. **Verify Configuration**
   - Check API key is correct
   - Verify model ID format
   - Ensure provider is selected

3. **Test with Different Model**
   - Try another model from same provider
   - Try a different provider
   - Use Groq as fallback

4. **Check Provider Status**
   - Visit provider's status page
   - Check if API is operational
   - Look for maintenance notices

5. **Update Model IDs**
   - Check provider documentation
   - Update `multi-providers.ts`
   - Restart dev server
   - Clear browser cache

## ✅ Verified Working

- ✅ Groq - All models tested and working
- ⏳ OpenRouter - Configured, needs API key testing
- ⏳ Routeway - Configured, model IDs updated
- ⏳ MegaLLM - Configured, needs paid account
- ⏳ AgentRouter - Configured, needs API key testing

## 🚀 Contributing

If you test a provider and find issues:
1. Note the exact error
2. Check provider docs for correct model IDs
3. Update `multi-providers.ts`
4. Test the fix
5. Submit a PR or issue

---

**Last Updated:** November 26, 2024
**Status:** Groq verified, others configured
