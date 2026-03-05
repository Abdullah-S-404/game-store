# GameStore

> A premium digital game store built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Live Demo

Deployed on [Vercel](https://vercel.com) — link added after deployment.

---

## ✨ Features

- 🎮 Browse a curated library of games with filtering & sorting
- 🔍 Instant search with live results in the Navbar
- 🛒 Shopping cart with quantity management
- 🔐 Authentication context (login / register / profile)
- 💫 Cinematic hero slider with thumbnail navigation
- 🏪 Game detail pages
- 📬 Contact form with FAQ accordion
- 🧑‍🤝‍🧑 About page with team & stats
- 🌑 Dark gaming theme with neon green accents

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| Icons | Lucide React |
| Fonts | Orbitron + Rajdhani (Google Fonts) |
| State | React Context API |
| Deployment | Vercel |

---

## 📦 Getting Started

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/game-store.git
cd game-store

# 2. Install
npm install

# 3. Copy env
cp .env.example .env.local

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/game-store)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add any environment variables from `.env.example`
4. Click **Deploy** ✅

---

## 📁 Project Structure

```
game-store/
├── app/
│   ├── about/          # About page
│   ├── cart/           # Shopping cart
│   ├── contact/        # Contact page
│   ├── games/          # Game library + detail pages
│   ├── login/          # Auth pages
│   ├── profile/        # User profile
│   ├── register/
│   ├── layout.tsx      # Root layout + providers
│   └── page.tsx        # Homepage
├── components/
│   ├── CustomDropdown.tsx
│   ├── Footer.tsx
│   ├── GameCard.tsx
│   ├── GameSlider.tsx
│   └── Navbar.tsx
├── context/            # Auth + Cart context
├── data/               # Mock game + category data
└── types/              # TypeScript types
```

---

## 📄 License

MIT © 2026 GameStore
