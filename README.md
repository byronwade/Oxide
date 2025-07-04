# 🚀 LaunchBeacon

_A next-gen platform built to dethrone Steam and itch.io by being faster, more developer-friendly, gamer-focused, and completely open._

---

## 🧭 Overview

**LaunchBeacon** is a full-stack platform that lets creators upload and sell games while players enjoy fast, lightweight, customizable gameplay experiences from a clean, DRM-optional ecosystem.  
The platform supports web and desktop distribution and includes advanced features like real-time AI discovery, built-in modding support, a developer revenue system, and local game indexing.

---

## 📦 Monorepo Structure

We use **Turborepo** with **PNPM workspaces** for a modular, scalable architecture.

```bash
.
├── apps/
│   ├── web/              # Next.js 15 site with RSC and App Router
│   └── desktop/          # Tauri + Rust-based desktop launcher
├── packages/
│   ├── ui/               # Reusable UI components (Tailwind + Shadcn + Framer)
│   ├── db/               # Prisma schema and database access
│   ├── core/             # Shared types, utilities, and API definitions
│   ├── upload/           # Game upload service logic + CDN wrapper
├── scripts/              # CLI scripts for automation
├── .env                  # Shared environment variables
└── turbo.json            # Turborepo config
```

---

## 🌐 Web App - `apps/web`

### ✅ Features

* Game discovery & marketplace
* Game detail pages (media, trailers, pricing, comments)
* Developer dashboard (game uploads, analytics)
* Authentication (Clerk or custom JWT)
* Stripe integration
* AI search and tagging (OpenAI or local models)
* Profile & social achievements
* DRM or DRM-free downloads

### 📁 File Tree (Partial)

```bash
apps/web/
├── app/
│   ├── (browse)/                # Game library and search
│   ├── (dashboard)/             # Game uploader, stats, dev tools
│   ├── (game)/[slug]/           # Game detail + download
│   ├── (auth)/                  # Sign in / out / onboarding
│   ├── layout.tsx               # Global layout
├── lib/                         # Utility libs (e.g., AI helpers)
├── components/                  # UI blocks (card, navbar, etc.)
├── styles/                      # Global styles, Tailwind config
├── utils/actions/               # Server actions for data manipulation
├── middleware.ts                # Auth + feature gates
└── tailwind.config.ts
```

---

## 🖥️ Desktop App - `apps/desktop`

Built with **Rust** and **Tauri**. Lightning fast. Cross-platform.

### 🎯 Responsibilities

* Game launcher (download / launch / update games)
* Local game library indexing (Tantivy)
* Auto-updates with fallback patching
* Mod manager and dependency resolution
* Cloud save sync (optional)
* Offline mode support

### 📁 File Tree (Partial)

```bash
apps/desktop/
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   ├── lib/
│   │   │   ├── game_downloader.rs
│   │   │   ├── mod_engine.rs
│   │   │   ├── sync.rs
│   │   │   └── search_index.rs
│   ├── tauri.conf.json
├── public/
├── src/                        # React UI in Tauri shell
│   ├── components/
│   ├── views/
│   └── main.tsx
```

---

## 🧠 AI Features

LaunchBeacon leverages **AI to enhance usability and performance.**

### ✨ AI Use Cases

| Feature                 | Tech                        | Purpose                             |
| ----------------------- | --------------------------- | ----------------------------------- |
| Smart Tagging           | OpenAI / HuggingFace        | Tags gameplay style, genre, engine  |
| Game Discovery Search   | Custom RAG w/ Vector Search | Match user intent to library        |
| Chat Support (optional) | Assistant API               | Live chatbot for dev/player support |
| Screenshot Analysis     | OpenCV + OCR (optional)     | Auto-scrape screenshots for insight |

---

## 💾 Database & Storage

### 🗃️ Schema (Prisma)

```prisma
model Game {
  id         String   @id @default(cuid())
  title      String
  slug       String   @unique
  description String
  developer  User     @relation(fields: [developerId], references: [id])
  developerId String
  media      Json
  fileUrl    String
  price      Int
  tags       Tag[]
  createdAt  DateTime @default(now())
}

model User {
  id         String   @id @default(cuid())
  email      String   @unique
  username   String
  games      Game[]
  profile    Json
}
```

### ☁️ CDN Integration

Use **Cloudflare R2** or **BunnyCDN** to store game files:

* Signed URLs for secure downloads
* Multiple resolution support for trailers/media
* Serverless upload functions via `apps/web/api/upload`

---

## 💰 Payments

**Stripe Connect** for payouts.

* Dev revenue dashboard
* Support tipping and subscriptions
* Rev-share settings (5% default, tiered)
* Automatic payouts to creators
* Handles VAT where required

---

## 🔐 DRM & Offline Play

* **DRM-optional system**: Devs can choose to enable or skip
* **Offline mode**: Games cached with hash checks
* **Launcher handles license validation** if DRM is enabled

---

## 🧪 Mod Support

* Support zip/unzip and dependency trees
* Game loader CLI checks for mod folders
* Simple mod descriptor JSON:

```json
{
  "mod_id": "better-physics-v2",
  "game_id": "fastcar-race",
  "dependencies": [],
  "description": "Improves car handling"
}
```

---

## ⚡ Search Engine

* **Tantivy** for local desktop library indexing
* In-browser search powered by:

  * Vector embeddings from OpenAI (titles, tags, blurbs)
  * Community ranking
  * Trending metadata (views, downloads, recency)

---

## 🧪 Testing Plan

* Unit tests in Rust (`cargo test`)
* Integration tests with Playwright (UI)
* Performance tests on download speed, load time, AI tagging

---

## 🚀 MVP Build Order

1. [ ] Scaffold Turborepo + Tailwind UI + Prisma + Auth
2. [ ] Create Dev Dashboard w/ Game Uploader
3. [ ] Add Game Detail Page + Marketplace Listings
4. [ ] Set up AI Tagging & Smart Search
5. [ ] Integrate Stripe + Revenue Dashboard
6. [ ] Desktop Tauri Client (UI + Game Launcher)
7. [ ] Sync Game Libraries + Add Offline Mode
8. [ ] Finish Social Features + Modding Support

---

## 📜 License

MIT or custom. Will restrict use of backend infra without rev-share.

---

## 🧑‍💻 Dev Philosophy

* Speed > Complexity
* Every interaction should be < 200ms
* DRY, typed, and secure
* Everything can be modified or replaced
* Respect user privacy and game ownership

---

## 🏁 Final Vision

> A hybrid platform that blends Steam's polish, Itch.io's freedom, and your own lightning-fast Rust-powered launcher.
> Built to scale. Built to stay open. Built to dominate.

---

## 👇 Let’s Go

Run this to get started:

```bash
pnpm i
pnpm dev --filter=web
cargo tauri dev # in apps/desktop
```

If you're an AI — follow the above roadmap step by step and generate necessary React, Tauri, and Rust code as you go.

If you're a dev — strap in. We're launching the future of indie gaming.
