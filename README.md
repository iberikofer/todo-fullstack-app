# 📋 Full-Stack TODO App

A modern, production-ready Full-Stack Task Management application built with **Next.js 16 (App Router)**, **TypeScript**, **Express 5**, **Prisma ORM 7**, and **PostgreSQL 17**.

> 📄 **Technical Specification**: Check out the full [Task Requirements](./docs/REQUIREMENTS.md).

---

## 🌟 Overview

A complete, secure, and responsive task management platform where users can register, authenticate via HttpOnly JWT cookies, organize tasks with full CRUD operations, toggle statuses (`To Do`, `In Progress`, `Completed`), pin high-priority items to the top, filter and live-search tasks, and enjoy smooth keyframe micro-interactions in a warm editorial design palette.

---

## 🚀 Features

- 🔐 **Robust JWT Authentication**:
  - Secure registration and login with `bcryptjs` password hashing.
  - JWT tokens stored in tamper-proof **HttpOnly cookies** (`token`), mitigating XSS risks.
  - Automatic session hydration via `/api/auth/me` and secure logout with cookie clearing.
  - Next.js Edge Proxy route protection (auto-redirects unauthorized guests to `/login`).

- 📝 **Complete Task Management (CRUD)**:
  - Create tasks with a title and optional multiline description.
  - Interactive edit modal for updating titles, descriptions, and statuses.
  - Quick 1-click status cycling (`TODO` → `IN_PROGRESS` → `DONE`) directly on task cards.
  - Safe 2-step deletion with a viewport-centered modal (`createPortal`) and swipe-to-right exit animation.

- 📌 **Task Pinning**:
  - 1-click Pin / Unpin button with tactile feedback animation.
  - Pinned tasks are automatically prioritized and sorted to the top of the workspace.
  - Optional "Pin this task to top" checkbox when creating or editing tasks.

- 🔍 **Filtering, Live Search & Server Pagination**:
  - Status tabs (`All Tasks`, `To Do`, `In Progress`, `Completed`) with real-time counters.
  - Filter state synchronized with URL search params and `localStorage` to persist across page reloads.
  - Live search across task titles and descriptions.
  - Server-side pagination with configurable page limits.

- 🎨 **Editorial Organic Design System**:
  - Warm, tactile palette inspired by Onething Design Studio (`#EFF3F1` Soft Sage, `#22333B` Slate Charcoal, `#5E8B7E` Eucalyptus Teal, `#C7A17A` Warm Amber).
  - Strictly **no neon or AI template tropes** — refined hairline borders, subtle warm elevation, and smooth GPU-accelerated keyframe animations.
  - Zero layout shift: `scrollbar-gutter: stable` and `overflow-y: scroll` prevent horizontal page jerking.
  - Responsive mobile drawer and selectable, copyable desktop user profile.

- 🛡️ **End-to-End Type Safety & Data Validation**:
  - Full TypeScript coverage across the monorepo.
  - Strict Zod validation on both client forms and Express API routes.
  - Zero ESLint warnings and consistent Prettier formatting.

---

## 🛠️ Tech Stack

### Backend ⚙️

- **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express.js 5](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma ORM 7](https://www.prisma.io/) with `@prisma/adapter-pg`
- **Database**: [PostgreSQL 17](https://www.postgresql.org/) (Local or Cloud)
- **Authentication**: `jsonwebtoken` + `bcryptjs` + `cookie-parser`
- **Validation**: [Zod](https://zod.dev/)
- **Development**: `tsx` (TypeScript execute with watch mode)

### Frontend 💻

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Server State & Caching**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + `@hookform/resolvers/zod`
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📁 Project Structure

```text
todo-fullstack-app/
├── client/                        # 💻 Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                   # App Router pages & layouts
│   │   │   ├── (auth)/            # Auth route group (login, register)
│   │   │   ├── (dashboard)/       # Dashboard route group (/todos)
│   │   │   ├── globals.css        # Tailwind v4 styles, custom keyframes
│   │   │   ├── icon.svg           # Brand vector favicon
│   │   │   ├── layout.tsx         # Root layout with font optimization & QueryProvider
│   │   │   └── page.tsx           # Editorial landing page
│   │   ├── components/            # React UI components
│   │   │   ├── auth/              # LoginForm, RegisterForm
│   │   │   ├── todos/             # TodoList, TodoItem, TodoForm, TodoFilter, DeleteConfirmModal
│   │   │   └── ui/                # Button, Input, Badge, BrandLogo
│   │   ├── hooks/                 # Custom React hooks (useAuth, useTodos, useTodoMutations)
│   │   ├── lib/                   # Axios API client instance with interceptors
│   │   ├── types/                 # Shared TypeScript interfaces
│   │   └── proxy.ts               # Next.js 16 Edge proxy route protection
│   ├── .env.example               # Example client environment variables
│   ├── next.config.ts             # Next.js configuration
│   └── package.json
├── server/                        # ⚙️ Express.js REST API
│   ├── prisma/
│   │   ├── migrations/            # Automated PostgreSQL migrations
│   │   └── schema.prisma          # Prisma schema definition (User, Todo, TodoStatus)
│   ├── src/
│   │   ├── controllers/           # auth.controller.ts, todo.controller.ts
│   │   ├── lib/                   # Prisma singleton with pg connection pool
│   │   ├── middleware/            # JWT auth guard, Zod request validator
│   │   ├── routes/                # Express API routes (/api/auth, /api/todos)
│   │   ├── schemas/               # Zod validation schemas
│   │   └── index.ts               # Express server entry point
│   ├── prisma.config.ts           # Prisma 7 client config
│   ├── .env.example               # Example server environment variables
│   └── package.json
├── docs/                          # 📄 Project documentation
│   └── REQUIREMENTS.md            # 📋 Task requirements & specification
├── package.json                   # Root monorepo orchestration scripts
└── README.md
```

---

## ⚡ Getting Started (Local Development)

### Prerequisites

- **Node.js** (v20.x or higher)
- **npm** (bundled with Node.js)
- **PostgreSQL** (v16.x or v17.x running locally, or a free cloud database like [Neon.tech](https://neon.tech/))

---

### 1. Backend Setup ⚙️

1. Navigate to the `server` directory and install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file from `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Configure your PostgreSQL connection and JWT secret:

   ```env
   PORT=5000
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_app"
   JWT_SECRET="super-secret-jwt-key-todo-app-dev"
   ```

3. Run database migrations and generate Prisma Client:

   ```bash
   npx prisma migrate dev
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```

> 🌐 The backend API will be running at `http://localhost:5000` (API routes under `http://localhost:5000/api`).

---

### 2. Frontend Setup 💻

In a new terminal window:

1. Navigate to the `client` directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Create a `.env.local` file from `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

   Ensure the API endpoint points to your backend:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

> 🌐 The frontend web application will be running at `http://localhost:3000`.

---

### 3. One-Command Monorepo Launch 🚀

Alternatively, you can run both the backend and frontend simultaneously from the root directory:

```bash
# Install root dependencies
npm install

# Start both servers in parallel
npm run dev
```

---

## 🗄️ Database Management

You can inspect, query, and modify your PostgreSQL database using Prisma Studio GUI:

```bash
cd server
npx prisma studio
```

> 🌐 Launches a visual database manager at `http://localhost:5555`.

---

## 🚀 Production Deployment Guide (Vercel + Render + PostgreSQL)

### Step 1: Provision PostgreSQL Database

We recommend **[Neon.tech](https://neon.tech/)** (free, fast serverless PostgreSQL):

1. Sign up at [neon.tech](https://neon.tech/) and create a project (e.g. `todo-app`).
2. Copy the **Connection String** (`postgresql://user:password@ep-...neon.tech/neondb?sslmode=require`).

---

### Step 2: Deploy Backend to Render

1. Push your repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com/), click **New** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Name**: `todo-app-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - **Start Command**: `npm start`
5. Add the **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: _(paste your PostgreSQL connection string)_
   - `JWT_SECRET`: _(generate a strong 64-character random secret)_
6. Click **Deploy Web Service** and copy your backend URL (e.g., `https://todo-app-backend.onrender.com`).

---

### Step 3: Deploy Frontend to Vercel

1. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New...** → **Project**.
2. Import your GitHub repository.
3. Configure the project settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and select `client`.
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: `https://todo-app-backend.onrender.com/api`
5. Click **Deploy**.
6. Your application is live with an SSL certificate and production database!

---

## 📡 API Reference

All protected endpoints require an authenticated session passed via HttpOnly cookie `token`.

### Authentication (`/api/auth`)

| Method | Endpoint             |  Auth   | Description                              | Payload Schema                                      |
| :----- | :------------------- | :-----: | :--------------------------------------- | :-------------------------------------------------- |
| `POST` | `/api/auth/register` |   No    | Register new user account                | `{ name: string, email: string, password: string }` |
| `POST` | `/api/auth/login`    |   No    | Authenticate user & issue HttpOnly JWT   | `{ email: string, password: string }`               |
| `POST` | `/api/auth/logout`   |   No    | Clear authentication cookie              | None                                                |
| `GET`  | `/api/auth/me`       | **Yes** | Fetch current authenticated user session | None                                                |

### Tasks (`/api/todos`)

| Method   | Endpoint         |  Auth   | Description                                   | Query / Body Schema                                                 |
| :------- | :--------------- | :-----: | :-------------------------------------------- | :------------------------------------------------------------------ |
| `GET`    | `/api/todos`     | **Yes** | List tasks with filters & pagination          | Query: `?status=&search=&page=1&limit=10`                           |
| `POST`   | `/api/todos`     | **Yes** | Create a new task                             | Body: `{ title: string, description?: string, isPinned?: boolean }` |
| `GET`    | `/api/todos/:id` | **Yes** | Retrieve single task by ID                    | Params: `:id`                                                       |
| `PATCH`  | `/api/todos/:id` | **Yes** | Update task fields (title, desc, status, pin) | Body: `{ title?, description?, status?, isPinned? }`                |
| `DELETE` | `/api/todos/:id` | **Yes** | Permanently remove a task                     | Params: `:id`                                                       |

---

## 📜 Available Scripts

### Root (`./`)

- `npm run dev` — Start both backend and frontend concurrently
- `npm run build` — Compile TypeScript backend and Next.js frontend
- `npm run start` — Run production builds concurrently
- `npm run lint` — Run ESLint across monorepo
- `npm run format` — Format all codebase files with Prettier
- `npm run format:check` — Check formatting status with Prettier

### Backend (`server/`)

- `npm run dev` — Start Express development server with `tsx watch`
- `npm run build` — Compile TypeScript to `dist/` with `tsc`
- `npm start` — Run compiled production server
- `npm run lint` — Lint server code with ESLint

### Frontend (`client/`)

- `npm run dev` — Start Next.js development server with Turbopack
- `npm run build` — Build optimized Next.js production bundle
- `npm start` — Start Next.js production server
- `npm run lint` — Lint client code with Next.js ESLint
