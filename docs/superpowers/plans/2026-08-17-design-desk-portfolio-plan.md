# My Design Desk Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive first-version personal portfolio website for a student UI/web designer using an interactive “My Design Desk” desktop metaphor, with replaceable project slots and working navigation/contact interactions.

**Architecture:** Use a small React + Vite single-page app. Keep portfolio content in a data module, visual primitives in focused components, and the desktop/mobile layout in CSS media queries. Each desk object has a semantic button, visible label, and a corresponding content panel so exploration remains understandable without hover-only behavior.

**Tech Stack:** React, Vite, CSS, native browser APIs, optional Lucide-style inline SVG icons only where needed.

## Global Constraints

- Use the approved “My Design Desk / 我的设计工作桌” concept.
- Preserve the mapping: album = selected works, sketchbook = process, envelope = about/resume, tool card = skills, stamp = updates/interests, contact card = email.
- Use the temporary identity copy “UI / 网页设计方向学生” and the approved introductory sentence until the user supplies revisions.
- Do not invent project names, clients, metrics, responsibilities, or case-study results.
- Keep three project slots visible with clear “整理中/即将补充” status text.
- Use a light, clean desktop scene with black/dark text and one accent color; avoid over-realistic 3D, dense cards, and decorative objects without meaning.
- All important actions must work with keyboard focus and must not depend on hover alone.
- Mobile must transform the desktop scene into a readable vertical object sequence without horizontal overflow.
- Support `prefers-reduced-motion` for all object transitions.

---

### Task 1: Scaffold the React application

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/data/portfolio.js`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

**Interfaces:**
- `portfolio.js` exports `portfolioData` containing `profile`, `experience`, `skills`, `projects`, and `contact`.
- `App.jsx` consumes `portfolioData` and renders the page shell.

- [ ] **Step 1: Create the Vite package manifest and entry files**

Use React 18+ and Vite scripts for `dev`, `build`, and `preview`. Mount `<App />` from `src/main.jsx` and import the global styles.

- [ ] **Step 2: Add the approved portfolio data**

Store the following values in `portfolioData`: identity “UI / 网页设计方向学生”; school “西华师范大学 · 本科”; experiences “四川宏川咨询有限公司 · 设计实习” and “上海木马设计 · 设计实习”; design tools Photoshop, Illustrator, CorelDRAW, Figma, Blender; workflow tools Codex, ChatGPT, WorkBuddy; email `17381255086@163.com`; and three project entries titled “实习项目”, “UI / 网页练习”, and “个人设计探索”, each with a visible preparation status and no fabricated result data.

- [ ] **Step 3: Add design tokens and base styles**

Define CSS variables for the desk background, paper surfaces, ink, muted text, accent, spacing, radius, shadow, and motion duration. Add semantic body styles, button reset styles, focus-visible outlines, and reduced-motion overrides.

- [ ] **Step 4: Run the first production build**

Run `npm install` and `npm run build` from the project root. Expected: Vite creates a successful production build with no missing imports.

---

### Task 2: Build the desktop scene and semantic object components

**Files:**
- Create: `src/components/DeskScene.jsx`
- Create: `src/components/DeskObject.jsx`
- Create: `src/components/ProfileNote.jsx`
- Create: `src/components/AlbumObject.jsx`
- Create: `src/components/SketchbookObject.jsx`
- Create: `src/components/EnvelopeObject.jsx`
- Create: `src/components/ToolCardObject.jsx`
- Create: `src/components/StampObject.jsx`
- Create: `src/components/ContactCardObject.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- `DeskObject` accepts `{ id, label, eyebrow, className, children, onActivate }` and renders a keyboard-accessible button-like object.
- `DeskScene` accepts `{ activePanel, onOpenPanel }` and renders all six mapped objects plus the profile note.
- Each object calls `onOpenPanel(panelId)` when activated.

- [ ] **Step 1: Write the scene component structure**

Create a desk-stage section with an accessible heading, a profile note for the name and identity, and six semantic interactive objects. Use CSS grid/absolute positioning only for the desktop composition; keep the DOM order aligned with the logical reading order.

- [ ] **Step 2: Implement the shared object wrapper**

Create consistent object styling with a visible label, hover transform, focus ring, and `aria-label`. Do not use a hover-only tooltip as the only explanation of an object.

- [ ] **Step 3: Implement each mapped object**

Give each object a distinct but simple visual form: a paper album with thumbnails, a lined sketchbook, a sealed envelope, a tool card with compact labels, a stamp, and a contact card. Use CSS shapes and text for the physical objects; do not add unapproved stock imagery.

- [ ] **Step 4: Add the desktop scene to `App.jsx`**

Render the scene as the first viewport, with a small top-level action for “联系我” and a screen-reader-friendly description explaining that the objects open sections of the portfolio.

- [ ] **Step 5: Verify desktop layout locally**

Run `npm run dev -- --host 127.0.0.1` and inspect the first viewport at a laptop-sized browser viewport. Confirm the title, object labels, accent color, and contact action are visible without clipping.

---

### Task 3: Add content panels and portfolio interactions

**Files:**
- Create: `src/components/ContentPanel.jsx`
- Create: `src/components/WorksPanel.jsx`
- Create: `src/components/AboutPanel.jsx`
- Create: `src/components/SkillsPanel.jsx`
- Create: `src/components/ProcessPanel.jsx`
- Create: `src/components/ContactPanel.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/DeskScene.jsx`

**Interfaces:**
- `ContentPanel` accepts `{ panelId, onClose, children }` and renders a closable dialog-like panel.
- `WorksPanel` consumes `portfolioData.projects`.
- `AboutPanel` consumes `portfolioData.profile` and `portfolioData.experience`.
- `SkillsPanel` consumes `portfolioData.skills`.
- `ContactPanel` consumes `portfolioData.contact` and exposes a `mailto:` link.

- [ ] **Step 1: Implement panel state in `App.jsx`**

Track one active panel with React state. Opening an object sets its panel ID; closing resets it. Clicking the top-level contact action opens the contact panel.

- [ ] **Step 2: Implement the shared panel shell**

Render a visually distinct paper/modal panel with a close button, heading, and clear focus state. Close on the explicit close button and Escape key; preserve the underlying desk scene so the user understands where the panel came from.

- [ ] **Step 3: Implement the works panel**

Render three project slots with number, category, status, and a short sentence explaining that the case study is being prepared. Do not add fake thumbnails or claims.

- [ ] **Step 4: Implement about, process, skills, and contact panels**

Show the known university and internships, the case-study template the user can later fill, grouped design/workflow tools, and a clickable email link. Keep the phone number out of the public first version.

- [ ] **Step 5: Verify interaction paths**

Click each object and confirm the correct panel opens. Confirm Escape and close buttons work, the email link has the correct `mailto:` target, and keyboard Tab/Enter can open and close panels.

---

### Task 4: Implement mobile transformation and accessibility polish

**Files:**
- Modify: `src/components/DeskScene.jsx`
- Modify: `src/components/ContentPanel.jsx`
- Modify: `src/styles/global.css`
- Create: `src/styles/responsive.css`

- [ ] **Step 1: Define the mobile object sequence**

At widths below 720px, replace the absolute desktop composition with a vertical sequence ordered as profile note, album, sketchbook, envelope, tools, stamp, and contact card.

- [ ] **Step 2: Make panels mobile-safe**

Use an in-flow or bottom-sheet presentation that fits within the viewport, allows scrolling, and does not create horizontal overflow. Keep close controls reachable near the top of the panel.

- [ ] **Step 3: Audit semantics and keyboard behavior**

Confirm each object has a meaningful accessible name, buttons are real buttons or links, focus is visible, and reduced motion disables transforms and panel animation.

- [ ] **Step 4: Verify responsive behavior**

Test a desktop viewport and a narrow mobile viewport. Confirm no clipped text, no horizontal scroll, readable line lengths, and a usable contact link.

---

### Task 5: Browser verification and handoff cleanup

**Files:**
- Modify: any component or style file required by visual QA
- Create: `README.md`

- [ ] **Step 1: Run the production build again**

Run `npm run build`. Expected: successful build with no errors.

- [ ] **Step 2: Verify the rendered page in Browser/IAB**

Open the local app, inspect the first viewport, scroll through the mobile sequence, and exercise the album, envelope, tool card, and contact flows. Use Playwright only if Browser/IAB is unavailable.

- [ ] **Step 3: Capture and inspect desktop and mobile screenshots**

Compare the implementation against the approved design specification for at least these points: object hierarchy, typography, palette, interaction feedback, panel readability, mobile sequence, and contact behavior.

- [ ] **Step 4: Add reproduction instructions**

Document the install command, development command, production build command, main file structure, and where future project content should be edited.

- [ ] **Step 5: Remove temporary QA artifacts**

Keep only user-facing source files and documentation in the project. Remove temporary screenshots or debugging files that are not needed for reproduction.
