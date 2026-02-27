# 🤖 AI-VIBE-CHAT-V3

<p align="center">
  <img src="https://img.shields.io/badge/AI--VIBE-CHAT--V3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="AI Vibe Project">
  <br>
  <b>Funny Formal AI - Where Bureaucracy Meets Comedy! 🎭</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0+-black.svg?logo=next.js&logoColor=white" alt="Next.js 15">
  <img src="https://img.shields.io/badge/React-19.0+-61DAFB.svg?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind-4.0+-06B6D4.svg?logo=tailwind-css&logoColor=white" alt="Tailwind 4">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

---

> *"Ask anything, get a formal answer... with a twist of fun!"*

---

## 🗺️ Quick Navigation

- [✅ Stabilization Status](#-stabilization-status-ralph-5-iteration-loop)
- [🎯 What's This All About?](#-whats-this-all-about)
- [🌐 Multi-Provider Support](#-multi-provider-support-30-ai-models)
- [🚀 The Magic Powers](#-the-magic-powers)
- [🎨 The Unique Experience](#-the-unique-experience)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack-the-serious-bits)
- [🚀 Getting Started](#-getting-started-for-developers)
- [🎮 How to Use](#-how-to-use)
- [📁 Project Structure](#%EF%B8%8F-project-structure)

---

## 🛠️ Engineered With

<p align="left">
  <a href="https://nextjs.org"><img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js"></a>
  <a href="https://react.dev"><img src="https://skillicons.dev/icons?i=react" alt="React"></a>
  <a href="https://tailwindcss.com"><img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind CSS"></a>
  <a href="https://typescriptlang.org"><img src="https://skillicons.dev/icons?i=ts" alt="TypeScript"></a>
  <a href="https://vercel.com"><img src="https://skillicons.dev/icons?i=vercel" alt="Vercel"></a>
</p>

---

## ✅ Stabilization Status (Ralph 5-Iteration Loop)

| Iteration | Focus | Status |
|-----------|-------|--------|
| 1 | Runtime Audit & Failure Mapping | ✅ Complete |
| 2 | Render & Lifecycle Stabilization | ✅ Complete |
| 3 | Core Feature Repair (Chat) | ✅ Complete |
| 4 | UX, Error Handling & Noise Removal | ✅ Complete |
| 5 | Browser Verification & Lock-In | ✅ Complete |

**Current State:**
- ✅ App builds successfully (Next.js 15, React 19, Tailwind CSS 4)
- ✅ Dev server runs on http://localhost:3002
- ✅ API endpoints working (/api/ask)
- ✅ Chat interface functional with mock/demo mode
- ✅ Multi-provider support (Groq, OpenRouter, Routeway, MegaLLM, AgentRouter)
- ✅ Graceful fallback when API keys invalid

**Known Limitations:**
- Live API responses require valid API keys
- Mock mode active when keys are invalid/empty
- Running without Turbopack (has localStorage SSR bug)

--- 

Welcome to the most polite, well-dressed AI you've ever met! Picture this: you've got the sophistication of a Victorian gentleman, the humor of a stand-up comedian, and the knowledge of a rocket scientist - all rolled into one delightful digital experience. That's exactly what Funny Formal AI brings to the table!

## 🎯 What's This All About?

This isn't your ordinary AI chat app - oh no! This is where **formality meets fun**, where **serious questions get hilariously entertaining answers**, and where asking "What's the weather like?" might just get you a response worthy of a Shakespeare play!

Think of it as having a conversation with:
- A distinguished professor who moonlighted as a comedian
- A butler who went to Oxford and took improv classes
- A librarian who's secretly hilarious and loves dad jokes

## 🌐 Multi-Provider Support (30+ AI Models!)

Access **30+ AI models** from **5 different providers**! Configure API keys in the Settings dialog (⚙️).

### 🔌 Supported Providers

1. **Groq** (FREE) - Lightning-fast inference with Meta Llama models
2. **OpenRouter** (FREE) - Access to Grok, DeepSeek, Qwen, Gemini
3. **Routeway** (FREE) - Kimi, GLM, DeepSeek, Llama models
4. **MegaLLM** (PAID) - Premium access to latest models
5. **AgentRouter** (FREE) - GLM, DeepSeek, Claude models

**See [MULTI_PROVIDER_GUIDE.md](MULTI_PROVIDER_GUIDE.md) for complete details!**

## 🚀 The Magic Powers

Our AI comes with **30+ different models** from multiple providers:

### 🎭 **Groq Models** (FREE)
- **Llama 3.1 8B Instant** ⚡ - Ultra-fast inference
- **Llama 3.3 70B Versatile** 🧠 - High-quality reasoning
- **Llama 4 Maverick** 🚀 - Advanced reasoning (128K context)
- **Llama 4 Scout** 🗺️ - Optimized for chat

### 🌐 **OpenRouter Models** (FREE)
- **Grok Beta** 🤖 - xAI's conversational model (131K context)
- **DeepSeek Chat** 💡 - Powerful reasoning (64K context)
- **Qwen 2.5 72B** 🇨🇳 - Advanced multilingual (32K context)
- **Gemini 2.0 Flash** ⚡ - Fast Google model (1M context!)
- **Llama 3.2 3B** 📦 - Efficient small model

### 🛣️ **Routeway Models** (FREE)
- **Kimi (Moonshot)** 🌙 - 8K and 32K context versions
- **GLM-4 Plus** 🎯 - Advanced reasoning (128K context)
- **DeepSeek Chat** 💡 - Powerful reasoning
- **Llama 3.1 70B** 🦙 - High-quality responses

### 🤖 **AgentRouter Models** (FREE)
- **GLM-4 Flash** ⚡ - Fast reasoning (128K context)
- **DeepSeek Chat** 💡 - Powerful reasoning
- **Claude 3 Haiku** 🎨 - Fast Claude (200K context!)
- **Claude 3 Sonnet** 🎵 - Balanced Claude (200K context)

### 💎 **MegaLLM Models** (PAID)
- **Llama 3.3 70B** - Latest Llama version
- **Qwen 2.5 72B** - Advanced multilingual
- **DeepSeek V3** - Latest DeepSeek

*Most models are completely **FREE**! Configure API keys in Settings (⚙️)*

## 🎨 The Unique Experience

### What Makes Us Special?

1. **🏛️ Formally Funny**: Every response is both professionally informative AND entertainingly amusing
2. **⚡ Lightning Fast**: Powered by Groq's ultra-fast inference (no more waiting for 30 seconds!)
3. **🎭 16 Personalities**: From serious academics to witty conversationalists
4. **🌍 Multiple Providers**: Meta, OpenAI, Qwen, MoonshotAI, and more
5. **📊 Rate Limits Visible**: Transparent about usage (no surprises!)
6. **🎪 No Limits**: No monthly quotas, no hidden costs, just pure AI goodness
7. **💬 Chat History**: Persistent conversation history with localStorage
8. **🌙 Dark Mode**: Automatic dark mode based on system preferences
9. **📋 Copy to Clipboard**: Easy sharing of AI responses
10. **⚡ Streaming Responses**: Real-time typing effect for better UX
11. **♿ Accessible**: Full keyboard navigation and ARIA labels
12. **📱 Responsive**: Works perfectly on all devices

### Example Interaction:
**You**: "What's the weather like?"

**AI (Llama 3.1 Instant)**: *"Greetings! I am absolutely delighted to address your inquiry with the utmost meteorological precision. As someone who has devoted countless hours to studying atmospheric phenomena (and has the umbrella stains to prove it), I can assure you that the current weather conditions present what I like to call 'an opportunity for umbrella testing' - a delightfully unpredictable situation that would make even a meteorologist reach for their coat! 

The sky appears to be in one of its more theatrical moods today, likely performing what I call 'the grand drama of atmospheric storytelling.' Might I inquire as to which specific meteorological aspect tickles your weather-app-checking fancy? I am at your service, ready to embark upon this delightful forecast adventure with you!"*

## 🔒 Security Status

**Last Security Audit:** February 20, 2026
**Status:** 🟢 80% Secured (4/5 issues fixed)

### Security Fixes Applied
| Issue | Status | Details |
|-------|--------|---------|
| API Key Transmission | ✅ Fixed | Server-side only |
| Rate Limiting | ✅ Fixed | Added to /api/ask |
| Input Validation | ✅ Fixed | Zod schemas added |
| Error Leakage | ✅ Fixed | Generic messages |
| localStorage Encryption | 🔄 Pending | In progress |

### React/Next.js Best Practices Applied
- ✅ Server-side rendering (SSR)
- ✅ TypeScript strict mode
- ✅ Error boundaries
- ✅ Input validation
- ✅ Rate limiting
- ✅ Secure error handling

---

## 🛠️ Tech Stack (The Serious Bits)

- **⚛️ Next.js 15** - The superhero framework with App Router
- **⚡ React 19** - Latest React with concurrent features
- **🎨 Tailwind CSS 4** - For making things pretty with the new engine
- **📘 TypeScript 5** - Because we like our code like our jokes: type-safe
- **🚀 Groq API** - Lightning-fast AI inference
- **🛡️ Vercel** - Where dreams go to scale
- **💾 LocalStorage** - Client-side persistence for chat history
- **🌙 CSS Variables** - Dynamic theming support

## 🚀 Getting Started (For Developers)

### Prerequisites
- Node.js 18+ (the newer, the better!)
- A sense of humor (recommended but optional)
- Groq API key (grab one free at [console.groq.com](https://console.groq.com))

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mk-knight23/funny-formal-ai.git
   cd funny-formal-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   Create a `.env.local` file for server-side keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   OPENROUTER_API_KEY=your_key_here
   ROUTEWAY_API_KEY=your_key_here
   ```
   
   Or configure API keys in the app Settings (⚙️) dialog!

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Visit your creation**:
   Open [http://localhost:3000](http://localhost:3000) and prepare to be amazed!

## 🚀 Deploy to Vercel (The Easy Way)

1. **Fork/Clone this repo**
2. **Go to [Vercel.com](https://vercel.com)**
3. **Import your repository**
4. **Add the environment variable**: `GROQ_API_KEY=your_key_here`
5. **Click Deploy** and watch the magic happen! ✨

## 🎮 How to Use

1. **Visit the app** (when deployed or running locally)
2. **Choose your AI personality** from the dropdown (16 options!)
3. **Ask any question** (serious, silly, or completely random)
4. **Watch the AI type in real-time** with streaming responses
5. **View your chat history** - all conversations are saved locally
6. **Copy responses** with one click using the copy button
7. **Toggle dark mode** with the moon/sun button
8. **Use keyboard shortcuts** - Press Enter to send, Shift+Enter for new line
9. **Try different models** to see their unique personalities

## 🎭 Example Questions to Try

- "Explain quantum physics like you're a Victorian butler"
- "What's the meaning of life?" (bonus points for dramatic flair)
- "How do I make the perfect cup of tea?"
- "Tell me about the history of broccoli in exactly 3 sentences"
- "Why did the chicken cross the road?" (expect the most formal answer ever!)

## ✨ New Features (Latest Update)

### 🚀 React 19 & Next.js 15 Upgrades
- **Streaming Responses**: Real-time typing effect for AI responses
- **Optimistic Updates**: Instant UI feedback before server response
- **Concurrent Rendering**: Smoother interactions and better performance

### 💬 Enhanced Chat Experience
- **Persistent History**: All conversations saved in localStorage
- **Copy to Clipboard**: One-click copying of any message
- **Auto-scroll**: Automatically scrolls to latest message
- **Clear History**: Easy way to start fresh

### 🎨 UI/UX Improvements
- **Dark Mode**: Automatic detection with manual toggle
- **Loading Skeletons**: Better loading states
- **Error Boundaries**: Graceful error handling
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Responsive Design**: Optimized for all screen sizes

### ♿ Accessibility
- **ARIA Labels**: Full screen reader support
- **Keyboard Navigation**: Complete keyboard accessibility
- **Focus Management**: Proper focus handling
- **Color Contrast**: WCAG compliant colors

### 🎯 Performance
- **Custom Scrollbar**: Styled scrollbars matching theme
- **Smooth Animations**: CSS-based animations for better performance
- **Optimized Re-renders**: React.memo and useCallback usage
- **Lazy Loading**: Components loaded on demand

## 🏗️ Project Structure

<details>
<summary>View Detailed Directory Map</summary>

```
funny-formal-ai/
├── src/
│   ├── app/
│   │   ├── api/ask/route.ts    # API route for AI requests
│   │   ├── page.tsx           # Main chat interface (upgraded!)
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── not-found.tsx      # Custom 404 page
│   │   └── globals.css        # Global styles + dark mode
│   ├── components/
│   │   ├── ErrorBoundary.tsx  # Error handling component
│   │   └── LoadingSkeleton.tsx # Loading state component
│   └── lib/
│       └── ai-providers.ts    # 16 AI models configuration
├── public/                    # Static assets
├── .env.local                # Environment variables
├── package.json              # Dependencies (React 19, Next.js 15)
└── README.md                 # This file
```
</details>


## 🎨 Customization

- **Add models**: Update `src/lib/ai-providers.ts`
- **Change personality**: Modify the system prompt in `ai-providers.ts`
- **Styling updates**: Edit `src/app/globals.css` and component styles
- **Add features**: Extend `src/app/page.tsx`
- **Dark mode colors**: Customize CSS variables in `globals.css`
- **Chat history storage**: Modify localStorage logic in `page.tsx`

## 🔧 Configuration

### Environment Variables
```env
GROQ_API_KEY=your_groq_api_key_here
```

### Tailwind CSS 4
This project uses the latest Tailwind CSS 4 with the new engine:
- Faster builds
- Better performance
- Native CSS variables
- Improved dark mode support

### TypeScript Configuration
Strict mode enabled for maximum type safety:
- No implicit any
- Strict null checks
- No unused locals/parameters

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test everything works
5. Submit a pull request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- **Groq** - For the lightning-fast API that makes this possible
- **Meta** - For the amazing Llama models
- **OpenAI** - For the open-source GPT models
- **Qwen** - For the multilingual capabilities
- **MoonshotAI** - For the Kimi models
- **Next.js & Vercel** - For the amazing development platform

## 🎪 Final Notes

Remember: This is where **formal meets funny**, where **serious gets silly**, and where **questions get hilariously entertaining answers**! 

---

<p align="center">
  <b>Made with ❤️, 🤖, and too much coffee by mk-knight23</b>
</p>

*P.S. - No robots were harmed in the making of this app. Some may have been slightly entertained, though. 😉*

---

🔗 **Live Demo**: [Coming Soon to Vercel!]()
🐛 **Issues**: [Report bugs or request features here]()
💬 **Questions**: [Start a discussion here]()
⭐ **Like it?**: Star the repo and share the laughter! 🤩


## 🎯 Problem Solved

This repository provides a streamlined approach to modern development needs, enabling developers to build robust applications with minimal complexity and maximum efficiency.

## ✨ Features

- **Core Functionality:** Primary features and capabilities
- **Production Ready:** Built for real-world deployment scenarios
- **Optimized Performance:** Efficient resource utilization
- **Developer Experience:** Clear documentation and intuitive API

## 🏗️ Architecture

```
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mk-knight23/AI-VIBE-CHAT-V3
cd AI-VIBE-CHAT-V3

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Deployment

### Live URLs

| Platform | URL |
|----------|-----|
| Vercel | [Deployed Link] |
| GitHub Pages | [Deployed Link] |


## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ by mk-knight23