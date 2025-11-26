# 🚀 Quick Start Guide

## Get Started in 3 Minutes!

### 1️⃣ Prerequisites
- Node.js 18+ installed
- Groq API key ([Get one free](https://console.groq.com))

### 2️⃣ Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/funny-formal-ai.git
cd funny-formal-ai

# Install dependencies
npm install
```

### 3️⃣ Configuration

Create `.env.local` file:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4️⃣ Run

```bash
# Development mode
npm run dev

# Open http://localhost:3000
```

## 🎯 First Steps

### Try These Features

1. **Ask a Question**
   - Type: "What is the meaning of life?"
   - Press Enter or click "Ask the AI!"
   - Watch the streaming response

2. **Switch Models**
   - Click the model dropdown
   - Try different AI personalities
   - See how responses differ

3. **Toggle Dark Mode**
   - Click the 🌙/☀️ button
   - Watch smooth color transition
   - Preference is saved

4. **Copy a Response**
   - Click the 📋 button
   - See ✓ confirmation
   - Paste anywhere

5. **View History**
   - Scroll up to see past messages
   - All conversations are saved
   - Click "Clear" to reset

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line |
| `Tab` | Navigate elements |

## 🎨 Customization

### Change AI Personality
Edit `src/lib/ai-providers.ts`:
```typescript
content: `You are a [YOUR PERSONALITY HERE]...`
```

### Modify Colors
Edit `src/app/globals.css`:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Add New Models
Edit `src/lib/ai-providers.ts`:
```typescript
models: [
  { 
    id: 'new-model-id', 
    name: 'New Model Name',
    description: 'Description',
    provider: 'Provider',
    supported: true 
  }
]
```

## 🚀 Deploy to Vercel

### Option 1: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Add environment variable: `GROQ_API_KEY`
5. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📱 Test on Mobile

1. Get your local IP: `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
2. Run: `npm run dev`
3. Visit: `http://YOUR_IP:3000` on mobile

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### API Not Working
- Check `.env.local` exists
- Verify API key is correct
- Test at [console.groq.com](https://console.groq.com)

### Dark Mode Not Working
- Clear browser cache
- Check system preferences
- Try manual toggle

### History Not Saving
- Check browser localStorage
- Try different browser
- Clear localStorage: `localStorage.clear()`

## 📚 Learn More

- **Features**: Read `FEATURES.md`
- **Changelog**: Read `CHANGELOG.md`
- **Deployment**: Read `DEPLOYMENT_GUIDE.md`
- **Comparison**: Read `BEFORE_AFTER.md`

## 🎯 Next Steps

1. ✅ Get it running locally
2. ✅ Try all features
3. ✅ Customize to your liking
4. ✅ Deploy to Vercel
5. ✅ Share with friends!

## 💡 Pro Tips

### Faster Development
```bash
# Use Turbopack (faster)
npm run dev --turbo
```

### Check for Issues
```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Build test
npm run build
```

### Performance
- Use production build for testing
- Enable caching in Vercel
- Optimize images in `/public`

## 🎊 You're Ready!

Your Funny Formal AI is now running with:
- ✅ 16 AI models
- ✅ Chat history
- ✅ Dark mode
- ✅ Streaming responses
- ✅ Copy to clipboard
- ✅ Keyboard shortcuts
- ✅ Full accessibility

**Enjoy chatting with your AI! 🤖✨**

---

**Need Help?**
- 📖 Read the docs
- 🐛 Check console for errors
- 💬 Open GitHub issue
- 📧 Contact support

**Happy Coding! 🚀**
