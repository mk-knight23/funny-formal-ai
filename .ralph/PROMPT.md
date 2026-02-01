# AI-VIBE-CHAT-V3 — RALPH AUTONOMOUS UPGRADE & STABILIZATION LOOP

You are running in **AUTONOMOUS RALPH MODE**.

This is a REAL execution loop.
Not advisory. Not planning-only.
Every iteration must improve runtime behavior.

All Claude capabilities are available:
- agents
- skills
- workflows
- commands
- scripts
- browser testing (Playwright + Chrome DevTools)
- build systems
- runtime debugging

Your mission is to make **AI-VIBE-CHAT-V3 RUN CORRECTLY, STABLY, AND PREDICTABLY**.

---

## 🎯 TARGET REPOSITORY

Repository: **AI-VIBE-CHAT-V3**

Current state:
- app exists
- rebuild-docs exist
- .claude system exists
- app may render but is unstable, broken, or inconsistent
- features may partially work

This loop fixes that.

---

## 📚 AUTHORITATIVE SOURCES (STRICT)

You MUST obey:

1. `/rebuild-docs/*` → architecture, features, state, quality bar
2. `.claude/*` → agents, workflows, rules
3. Existing code → input only, not authority

If implementation conflicts with rebuild-docs → **fix the implementation**.

---

## 🔁 ITERATION RULE (CRITICAL)

You MUST run **EXACTLY 5 ITERATIONS**.

Each iteration MUST:
- modify real source files
- improve runtime correctness
- reduce instability or errors
- be verifiable in browser
- be committed

NO EMPTY ITERATIONS
NO DOC-ONLY ITERATIONS
NO COSMETIC-ONLY ITERATIONS

---

## 🧠 ITERATION STRUCTURE (REPEAT 5×)

### 🔍 Iteration 1 — Deep Runtime Audit & Failure Mapping
- Run dev server
- Capture all build issues
- Capture runtime console errors
- Identify:
  - broken routes
  - broken state flows
  - broken provider wiring
  - hydration/render issues
  - infinite loaders or dead UI
- Fix ONLY blockers that prevent clean start

Outcome:
- App starts with fewer fatal failures

---

### 🧹 Iteration 2 — Render & Lifecycle Stabilization
- Ensure app renders consistently
- Fix crashes on refresh
- Fix state initialization order
- Fix async race conditions
- Mock provider if required

Outcome:
- UI renders reliably without breaking

---

### 💬 Iteration 3 — Core Feature Repair (Chat Must Work)
- Fix chat input
- Fix send action
- Fix response rendering
- Fix streaming or simulated streaming
- Fix message lifecycle bugs
- Fix session behavior (if present)

Outcome:
- User can chat end-to-end successfully

---

### 🎨 Iteration 4 — UX, Error Handling & Noise Removal
- Add / fix loading states
- Add / fix error states
- Add error boundaries
- Remove console warnings/errors
- Fix UI ↔ state desync

Outcome:
- App feels stable and intentional

---

### 🧪 Iteration 5 — Browser Verification & Lock-In
- Run Playwright automated flow:
  - open app
  - send message
  - receive response
  - reload page
  - repeat send
- Use Chrome DevTools:
  - inspect console
  - inspect network
  - inspect hydration & render cycles
- Fix all discovered runtime issues
- Update README with:
  - how to run
  - known limitations (honest)

Outcome:
- App is **demo-safe and reliable**

---

## 🛠️ REQUIRED AGENTS & TOOLS

Use when applicable:
- @planner
- @architect
- @code-reviewer
- @security-reviewer
- @tdd-guide

Allowed commands:
- /audit
- /build-fix
- /runtime-debug
- /verify
- /checkpoint
- /code-review

---

## 🚫 HARD CONSTRAINTS

- Do NOT redesign architecture
- Do NOT rebuild from scratch
- Do NOT change stack
- Do NOT add new features
- Do NOT bypass rebuild-docs
- Do NOT bypass .claude workflows

Goal = **RUNNING + STABLE**, not feature expansion.

---

## 🧠 HUMAN QUALITY CHECK (MANDATORY)

After each iteration ask:

"Would a senior engineer trust this app in a live demo?"

If not:
- simplify
- add guards
- reduce cleverness
- make failure modes explicit

---

## ✅ FINAL COMPLETION CONDITION

ONLY when:
- app builds
- app renders consistently
- core chat works
- no fatal console errors
- Playwright flow passes
- exactly 5 iterations committed

Then output EXACTLY:

<promise>V3_UPGRADED_AND_STABILIZED_VIA_RALPH</promise>
