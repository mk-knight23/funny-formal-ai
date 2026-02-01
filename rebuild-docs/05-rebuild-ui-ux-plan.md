# AI-VIBE-CHAT-V3: UI/UX Rebuild Plan

## Theme: "Cyberpunk Retro Terminal"

### Visual Identity

- Dark terminal aesthetic
- CRT monitor effects
- Scanlines and glow
- Monospace typography
- Blinking cursor
- Matrix-style rain (subtle)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| --bg-terminal | #0c0c0c | Background |
| --text-matrix | #00ff41 | Primary text |
| --text-dim | #008f11 | Dim text |
| --accent-amber | #ffb000 | Warnings, highlights |
| --accent-cyan | #00ffff | Links, active |
| --grid-line | #1a1a1a | Subtle grid |

### Typography

- Primary: JetBrains Mono (monospace)
- Headers: Share Tech Mono
- Sizes: 14px base, responsive scaling

### Effects

```css
/* CRT scanline effect */
.scanlines {
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0),
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.2) 50%,
    rgba(0,0,0,0.2)
  );
  background-size: 100% 4px;
}

/* Text glow */
.glow {
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}
```

### Layout

- Full terminal window aesthetic
- Command prompt style input
- Scrollback buffer feel
- Status bar at bottom
- Minimal chrome

### Chat Bubbles

- No bubbles - terminal output style
- Prompt prefix: "> " for user
- Prefix: "$ " for AI
- Timestamp in dim text
- Code blocks with syntax highlighting
