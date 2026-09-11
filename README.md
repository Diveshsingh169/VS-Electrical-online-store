# VS Electricals

A modern, animated **electrical-appliances catalog & enquiry website** built with Next.js, Tailwind
CSS and MySQL. Visitors browse products by category, view detailed specs, and submit a
**Request-a-Quote / enquiry** that is saved to your MySQL database. No cart, no login — a clean
catalog + lead-capture site inspired by Havells, Polycab and Anchor/Panasonic.

---

## ✨ Features

- **Home** — hero carousel (Swiper), category grid, featured products, animated stat counters
  (GSAP), scroll reveals (AOS), testimonials and a call-to-action.
- **Products** — full catalog with **category filter**, **search** and **sort** (all driven by the URL).
- **Product detail** — image gallery, specifications table, feature list, rating, related products
  and a per-product enquiry form.
- **About** & **Contact** pages, with the main enquiry form.
- **Enquiries & newsletter** are written to MySQL via API routes.
- Fully **responsive**, accessible, and respects reduced-motion preferences.
- **Graceful by design:** if the database is not set up yet, pages still render (empty states) and
  every image has a branded fallback — no crashes, no broken images.

## 🧰 Tech stack

| Layer      | Choice                                                        |
|------------|---------------------------------------------------------------|
| Framework  | Next.js 14 (App Router, `src/`), JavaScript/JSX               |
| Styling    | Tailwind CSS 3 (custom navy/amber/electric theme)             |
| Animation  | Swiper, AOS, GSAP — loaded via CDN                            |
| Database   | MySQL (via `mysql2` connection pool)                          |
| Icons      | Inline SVG (svgrepo / feather line style)                     |
| Images     | Unsplash                                                      |

---

## ✅ Prerequisites

- **Node.js** (v18.17+; v24 is fine). On this machine Node is installed at **`D:\Node jss\`**, which
  is **not on the system PATH**. In every terminal, put it on PATH first:

  ```bash
  export PATH="/d/Node jss:$PATH"
  ```

  (Git Bash syntax. In PowerShell use: `$env:Path = "D:\Node jss;$env:Path"`.)
  Verify with `node -v` and `npm -v`.

- **MySQL** running locally (you already have this installed).

---

## 🚀 Setup (4 steps)

### 1) Install dependencies

```bash
export PATH="/d/Node jss:$PATH"
npm install
```

### 2) Create the database + seed data

Run the provided script once. It creates the `vs_electricals` database, all tables, and ~32 sample
products across 8 categories.

**Option A — command line:**

```bash
mysql -u root -p < database/schema.sql
```

**Option B — MySQL Workbench:** `File ▸ Open SQL Script…` → pick `database/schema.sql` → click the
⚡ **Execute** button.

Verify it worked:

```sql
USE vs_electricals;
SELECT COUNT(*) FROM products;   -- expect 32
```

### 3) Configure environment variables

Copy the example file and fill in your MySQL credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vs_electricals

# Optional branding / contact (used across the site)
NEXT_PUBLIC_SITE_NAME=VS Electricals
NEXT_PUBLIC_PHONE=+91 99999 99999
NEXT_PUBLIC_EMAIL=sales@vselectricals.com
NEXT_PUBLIC_WHATSAPP=919999999999
```

> `.env.local` is git-ignored and holds your real password — never commit it.

### 4) Run the app

```bash
export PATH="/d/Node jss:$PATH"
npm run dev
```

Open **http://localhost:3000** 🎉

---

## 📜 Available scripts

| Command         | What it does                          |
|-----------------|---------------------------------------|
| `npm run dev`   | Start the dev server (hot reload)     |
| `npm run build` | Production build                      |
| `npm run start` | Serve the production build            |
| `npm run lint`  | Run Next.js/ESLint checks             |

_(Remember the `export PATH="/d/Node jss:$PATH"` prefix in each new terminal.)_

---

## 📁 Project structure

```
Store/
├─ database/schema.sql          # DB schema + seed data + example queries
├─ src/
│  ├─ app/
│  │  ├─ layout.js               # fonts, navbar/footer, CDN scripts
│  │  ├─ page.js                 # Home
│  │  ├─ products/page.js        # Catalog (filter/search/sort)
│  │  ├─ products/[slug]/page.js # Product detail + enquiry
│  │  ├─ about/page.js
│  │  ├─ contact/page.js
│  │  └─ api/
│  │     ├─ enquiries/route.js   # POST enquiry -> MySQL
│  │     └─ newsletter/route.js  # POST subscribe -> MySQL
│  ├─ lib/
│  │  ├─ db.js                   # MySQL connection pool
│  │  ├─ queries.js              # all read queries
│  │  ├─ site.js                 # nav, hero, testimonials, contact info
│  │  └─ utils.js                # helpers (currency, image sizing…)
│  └─ components/                # layout / home / products / forms / ui
└─ .env.local                    # your DB credentials (create from example)
```

---

## 📨 Where do enquiries go?

Every submitted enquiry / quote request is inserted into the **`enquiries`** table, and newsletter
sign-ups into **`newsletter_subscribers`**. View them anytime:

```sql
SELECT e.*, p.name AS product_name
FROM enquiries e
LEFT JOIN products p ON p.id = e.product_id
ORDER BY e.created_at DESC;
```

---

## 🎨 Customising

- **Products / categories:** edit `database/schema.sql` (or insert rows directly in MySQL). The site
  reads everything from the database.
- **Brand colours & fonts:** `tailwind.config.js`.
- **Contact details, socials, hero slides, testimonials:** `src/lib/site.js`.
- **Images:** any `https://images.unsplash.com/...` URL works; the app resizes them automatically.

---

## 📝 Notes

- **OneDrive:** this project lives in a OneDrive-synced folder. `node_modules` is git-ignored, but if
  OneDrive churns while syncing thousands of files, you can right-click the `node_modules` folder →
  *Always keep on this device* is **not** needed; instead you may exclude it from sync via
  OneDrive settings if you notice slowdowns. It does not affect the app.
- **No database yet?** The site still loads — categories fall back to a default list and product
  grids show a friendly empty state. Set up MySQL (step 2) to populate it.
- **Images** use a `SafeImage` component with a branded gradient fallback, so a blocked/slow image
  never shows as broken.

---

Built for **VS Electricals** — _Powering Homes. Trusted for Life._
