# 🍔 ReelFood — Discover Food Through Reels

ReelFood is a premium short-video food discovery web application. Users can scroll through immersive, vertical food reels to discover delicious meals, visit partner store profiles to view their menu grid, and register as food partners to upload their own creations.

Designed with a premium dark-mode aesthetic, micro-animations, and full responsiveness, this project is optimized for showcases and portfolio reviews.

---

## ✨ Features

* **🎥 Immersive Vertical Reels**: Auto-playing, looping vertical food reels with a frosted-glass overlay.
* **🔇 Sound Toggle & Toast**: Users can mute/unmute reels with a click, complete with clean interactive toasts.
* **🏷️ Partner Kitchen Badges**: Clearly flags dishes with partner attribution badges.
* **👤 Business Profiles**: Dynamic store pages displaying total meals, mock reach metrics, a video menu grid, and logo avatars.
* **🔐 Multi-Role Authentication**: Fully separated login/register flows for normal **Users** and **Food Partners**.
* **📁 ImageKit & Local Static Serving**: Integrates ImageKit with correct mime-type handling for uploads, alongside offline-ready local video fallback.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React.js, Vite
* **Routing**: React Router v6
* **Styling**: Vanilla CSS (Tailwind-free custom theme, glassmorphism, slide-up animations)
* **HTTP Client**: Axios

### Backend
* **Core**: Node.js, Express
* **Database**: MongoDB & Mongoose
* **Upload**: Multer, ImageKit SDK
* **Authentication**: JSON Web Tokens (JWT), Cookie-Parser, BcryptJS

---

## 📂 Project Structure

```
ReelFood/
├── backend/                  # Node/Express API Server
│   ├── src/
│   │   ├── controllers/      # Route controllers (Auth, Food, Partners)
│   │   ├── db/               # Database connection config
│   │   ├── middlewares/      # Authentication middlewares (User/Partner)
│   │   ├── models/           # Mongoose schemas (User, Partner, Food)
│   │   ├── routes/           # API router configurations
│   │   └── service/          # Third-party services (ImageKit integration)
│   ├── seed.js               # Database seeder script
│   └── server.js             # Entry point
│
├── frontend/                 # React client
│   ├── src/
│   │   ├── components/       # Reusable components (ReelsFeed, ReelItem)
│   │   ├── pages/            # View pages (Auth, Profile, CreateFood)
│   │   └── routes/           # React router configurations
│
└── videos/                   # Pre-bundled high-quality demo video assets
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* [MongoDB](https://www.mongodb.com/) running locally (port `27017`)

---

### Setup Instructions

#### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables template and fill in your values (or use local defaults):
   ```bash
   cp .env.example .env
   ```
4. Run the database seed script to populate the local MongoDB database with mock data and local offline-friendly video assets:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server runs at `http://localhost:3000`*

---

#### 2. Setup Frontend
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the client dev server:
   ```bash
   npm run dev
   ```
   *The application will open at `http://localhost:5173`*

---

## 🌱 Seeding Demo Data

The project contains a built-in idempotent seed script. Running `npm run seed` creates:
* **Demo Partner Account**: `demo@reelfood.app` / `Demo@1234`
* **5 Local Static Videos**: Beautiful, high-resolution food items that run fully offline (no external hotlink errors or CORS blockages).

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
