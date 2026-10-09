<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

A Bangla grocery price tracker that shows today's market rates for rice, pulses, oil, vegetables, fish, meat, dairy and spices, with market-wise price breakdowns and daily price changes.

[**🌐 Live Demo**](https://bazar-dor-steel.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-078a40?style=flat)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

</div>

---

## 📖 About

**বাজার দর (BazarDor)** helps people check the latest prices of everyday essentials in one place. Users can browse products by category, see which prices rose or fell today, and, after signing in, view minimum, maximum and average prices across different markets in Bangladesh.

## 🧰 Technologies Used

| Purpose | Technology |
|---|---|
| Framework | Next.js 15 (App Router, JavaScript) |
| Styling | Tailwind CSS v4 + DaisyUI |
| Authentication | Better Auth (Email/Password, Google, GitHub) |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Deployment | Vercel |

## ✨ Key Features

1. **📈 Live Price Ticker**: an infinite scrolling marquee showing each product's emoji, price per unit and ▲ / ▼ percentage change.
2. **🏠 Smart Home Page**: three product groups: today's top 6 price risers, top 6 fallers and the full product grid, plus a hero button that smooth-scrolls to the products section.
3. **🗂️ Category Pages with Sorting**: browse by category and sort by default, price low → high, or price high → low. Sorting uses numeric values, so Bengali numerals sort correctly.
4. **🔒 Protected Product Details**: only signed-in users can see the summary (min / max / average price) and the market-wise price table across divisions.
5. **🔐 Complete Authentication**: email/password, Google and GitHub login with Better Auth, profile page, name update, toast feedback, skeleton loaders, custom 404 page and a fully responsive design.

## 🗺️ Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page with risers, fallers and all products | Public |
| `/category/[slug]` | Category products with sorting | Public |
| `/product/[slug]` | Product details and market-wise prices | 🔒 Login required |
| `/signin` · `/signup` | Authentication pages | Public |
| `/profile` | User profile | 🔒 Login required |
| `/profile/update` | Update user information | 🔒 Login required |

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# then fill in your values

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `API_BASE_URL` | Host that serves the `/api/bazardor/...` endpoints |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | App URL (`http://localhost:3000` locally, your domain in production) |
| `MONGODB_URI` / `MONGODB_DB_NAME` | MongoDB connection string and database name |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

**OAuth callback URLs**

- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

## 📁 Project Structure

```
├── app/            # Routes (App Router): pages, layouts, auth API route
├── components/     # Navbar, Ticker, Hero, ProductCard, etc.
├── lib/            # Auth config, API helpers, data normalizer, formatters
└── middleware.js   # Protects /product and /profile routes
```

---

<div align="center">

Made with ❤️ for the assignment · বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।

</div>
