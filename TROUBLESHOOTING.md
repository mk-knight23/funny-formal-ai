# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. "Model not found" Error

**Error Message:**
```
Model with id 'xxx' was not found
```

**Cause:** The model ID doesn't match what the provider expects.

**Solutions:**

1. **Clear Browser Cache**
   ```
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache completely
   ```

2. **Check Provider Documentation**
   - Visit the provider's website
   - Look for their current model list
   - Verify the exact model ID format

3. **Try a Different Model**
   - Select another model from the same provider
   - Or switch to a different provider (Groq is most reliable)

4. **Update Configuration**
   - Edit `src/lib/multi-providers.ts`
   - Update the model ID to match provider's docs
   - Restart the dev server

### 2. "API key not configured" Error

**Error Message:**
```
API key not configured for [Provider]
```

**Solutions:**

1. **Add API Key**
   - Click ⚙️ Settings button
   - Select the provider tab
   - Enter your API key
   - Click "Save Settings"

2. **Verify Key is Saved**
   - Open browser DevTools (F12)
   - Go to Application > Local Storage
   - Check if `apiKeys` exists
   - Should contain your keys

3. **Get a New Key**
   - Visit provider's website
   - Generate a new API key
   - Copy and paste into Settings

### 3. Settings Not Saving

**Symptoms:** API keys disappear after refresh

**Solutions:**

1. **Check LocalStorage**
   - Ensure browser allows localStorage
   - Check if in private/incognito mode
   - Try a different browser

2. **Clear and Re-enter**
   ```javascript
   // In browser console:
   localStorage.clear()
   // Then re-enter keys in Settings
   ```

3. **Check Browser Settings**
   - Allow cookies and site data
   - Disable strict tracking prevention
   - Whitelist the site

### 4. Dark Mode Issues

**Symptoms:** Colors look wrong, flashing on load

**Solutions:**

1. **System Preference**
   - Check your OS dark mode setting
   - App follows system preference by default

2. **Manual Toggle**
   - Click 🌙/☀️ button to override
   - Preference is saved locally

3. **Clear Cache**
   - Hard refresh the page
   - Clear browser cache

### 5. Chat History Not Persisting

**Symptoms:** History disappears on refresh

**Solutions:**

1. **Check LocalStorage**
   ```javascript
   // In browser console:
   localStorage.getItem('chatHistory')
   ```

2. **Clear Corrupted Data**
   ```javascript
   localStorage.removeItem('chatHistory')
   // Then start a new chat
   ```

3. **Browser Compatibility**
   - Use a modern browser
   - Update to latest version
   - Try Chrome/Firefox/Safari

### 6. Streaming Not Working

**Symptoms:** Text appears all at once

**Solutions:**

1. **This is Normal**
   - Current implementation simulates streaming
   - Real streaming coming in future update

2. **Check Network**
   - Slow network may delay response
   - Check browser DevTools Network tab

### 7. Copy Button Not Working

**Symptoms:** Copy button doesn't copy text

**Solutions:**

1. **Browser Permissions**
   - Allow clipboard access
   - Check browser security settings

2. **HTTPS Required**
   - Clipboard API requires HTTPS
   - Use localhost for development

3. **Fallback Method**
   - Manually select and copy text
   - Use Ctrl+C / Cmd+C

### 8. Build Errors

**Error:** Build fails with TypeScript errors

**Solutions:**

1. **Clean Build**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Check TypeScript**
   ```bash
   npx tsc --noEmit
   ```

3. **Update Dependencies**
   ```bash
   npm update
   ```

### 9. API Rate Limiting

**Error:** Too many requests

**Solutions:**

1. **Wait and Retry**
   - Most providers have rate limits
   - Wait a minute and try again

2. **Check Provider Dashboard**
   - View your usage
   - Check rate limits
   - Upgrade plan if needed

3. **Switch Providers**
   - Use a different provider
   - Distribute requests across providers

### 10. Slow Responses

**Symptoms:** AI takes long to respond

**Solutions:**

1. **Try Faster Model**
   - Use Groq (fastest)
   - Try smaller models (8B instead of 70B)
   - Use "instant" or "flash" variants

2. **Check Network**
   - Test internet speed
   - Check provider status page
   - Try different network

3. **Switch Providers**
   - Some providers are faster than others
   - Groq is typically fastest

## 🔍 Debugging Steps

### Step 1: Check Browser Console
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Note the exact error text
```

### Step 2: Check Network Tab
```
1. Open DevTools (F12)
2. Go to Network tab
3. Look for failed requests
4. Check request/response details
```

### Step 3: Check LocalStorage
```
1. Open DevTools (F12)
2. Go to Application tab
3. Expand Local Storage
4. Check stored data
```

### Step 4: Test with Groq
```
1. Ensure Groq API key is set
2. Select a Groq model
3. Send a test message
4. If works, issue is with other provider
```

## 🆘 Still Having Issues?

### Collect Information
1. Browser and version
2. Operating system
3. Exact error message
4. Steps to reproduce
5. Screenshots if helpful

### Get Help
1. Check [PROVIDER_NOTES.md](PROVIDER_NOTES.md)
2. Read [MULTI_PROVIDER_GUIDE.md](MULTI_PROVIDER_GUIDE.md)
3. Search GitHub issues
4. Open a new issue with details

## 💡 Prevention Tips

### Best Practices
- ✅ Keep API keys secure
- ✅ Test with Groq first
- ✅ Clear cache after updates
- ✅ Use modern browsers
- ✅ Check provider status regularly
- ✅ Keep dependencies updated
- ✅ Monitor API usage
- ✅ Have backup providers configured

### Regular Maintenance
- Update model IDs quarterly
- Check for deprecated models
- Review provider documentation
- Test all configured providers
- Update dependencies monthly

---

**Need More Help?**
- 📖 Read the documentation
- 🐛 Check GitHub issues
- 💬 Ask in discussions
- 📧 Contact support
