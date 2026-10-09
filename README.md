# 🛒 বাজার দর (BazarDor)

বাংলাদেশের প্রয়োজনীয় নিত্যপণ্য — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার **আজকের বাজার দর** এক নজরে।
A Bangla grocery price tracker with market-wise price breakdowns, daily price change indicators and secure authentication.

## 🧰 Technologies Used

| Purpose | Tech |
|---|---|
| Framework | Next.js 15 (App Router, JavaScript — no TypeScript) |
| Styling | Tailwind CSS v4 + DaisyUI |
| Authentication | Better Auth (email/password, Google, GitHub) |
| Database | MongoDB (Better Auth adapter) |
| Notifications | react-hot-toast |
| Deployment | Vercel |

## ✨ 5 Key Features

1. **Live price ticker** — an infinite scrolling marquee with emoji, price per unit and ▲/▼ change %.
2. **Smart home page** — "আজ দাম বেড়েছে" (top 6 risers), "আজ দাম কমেছে" (top 6 fallers) and the full "সব পণ্য" grid, with a hero CTA that smooth-scrolls to the section.
3. **Category pages with numeric sorting** — sort by default / price low→high / high→low (Bengali numerals are converted to numbers before sorting).
4. **Protected product details** — only signed-in users can see min / max / average prices and the market-wise price table.
5. **Complete auth system** — Better Auth email/password + Google + GitHub, profile page and name update, toast feedback, skeleton loaders, friendly 404 pages and a fully responsive UI.

## 🚀 Getting Started

```bash
npm install
cp .env.example .env     # then fill in your keys
npm run dev
```

### Environment variables (`.env`)

| Variable | Description |
|---|---|
| `API_BASE_URL` | Host that serves `/api/bazardor/...` |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | App URL (`http://localhost:3000` / your Vercel URL) |
| `MONGODB_URI`, `MONGODB_DB_NAME` | MongoDB connection |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth |

OAuth redirect URLs: `{BETTER_AUTH_URL}/api/auth/callback/google` and `{BETTER_AUTH_URL}/api/auth/callback/github`.

## 📁 Routes

`/` · `/category/[slug]` · `/product/[slug]` 🔒 · `/signin` · `/signup` · `/profile` 🔒 · `/profile/update` 🔒
