# 📋 Full-Stack TODO Application

A production-ready Full-Stack Task Management application built with **Next.js 15 (App Router)**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL 17**.

Featuring secure JWT authentication stored in HttpOnly cookies, full task CRUD, status filtering, live search, server-side pagination, Edge route protection, and a warm, tactile editorial design system crafted without neon glow.

---

## 🚀 Key Features

- **🔐 Robust JWT Authentication**:
  - Secure user registration and login with bcrypt password hashing.
  - JWT tokens stored in tamper-proof **HttpOnly cookies** (`token`), mitigating XSS risks.
  - Active session verification via `/api/auth/me` and secure logout with cookie clearing.
  - Next.js Edge Middleware route protection (automatic redirect of unauthorized visitors to `/login`).

- **📝 Complete Task Management (CRUD)**:
  - Create tasks with a title and optional multiline description.
  - Update task details (title, description, status) via interactive modal dialogues.
  - Quick 1-click status cycling (`TODO` → `IN_PROGRESS` → `DONE`) directly on task cards.
  - Safe 2-step deletion with confirmation prompt to prevent accidental data loss.

- **🔍 Advanced Filtering, Search & Server Pagination**:
  - Filter tasks by status (`ALL`, `TODO`, `IN_PROGRESS`, `DONE`) with real-time count badges.
  - Live task search querying titles and descriptions on the server.
  - Server-side pagination with configurable page limits and intuitive controls.

- **🎨 Grounded Editorial Design System**:
  - Warm, tactile palette inspired by Onething Design Studio (`#EFF3F1` Soft Sage Alabaster, `#22333B` Slate Charcoal, `#5E8B7E` Eucalyptus Teal, `#C7A17A` Warm Amber).
  - Strictly **no neon or cyberpunk glow** — refined hairline borders, subtle warm elevation, and organic micro-interactions.
  - Custom SVG favicon and accessible WCAG AA+ contrast ratios across all states.

- **🛡️ Strict Type Safety & Data Validation**:
  - End-to-end TypeScript with shared schema contracts.
  - Zod request body & query validation middleware on Express.
  - React Hook Form with Zod resolver for instant, localized client-side feedback.
  - Unified ESLint 9+ flat configuration and Prettier formatting across frontend and backend.

---

## 🧰 Tech Stack

| Layer                  | Technology                                             | Details                                                             |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| **Frontend**           | [Next.js 15](https://nextjs.org/)                      | App Router, React 19, Server Components & Edge Middleware           |
| **Styling**            | [Tailwind CSS v4](https://tailwindcss.com/)            | Bespoke editorial color tokens, fluid typography                    |
| **Server State**       | [TanStack Query v5](https://tanstack.com/query/latest) | Automatic caching, background refetching, optimistic UX             |
| **Forms & Validation** | `react-hook-form` + `zod`                              | Declarative form state with runtime schema validation               |
| **Backend**            | [Express.js 5](https://expressjs.com/)                 | REST API with TypeScript, error-handling middleware                 |
| **ORM**                | [Prisma 7](https://www.prisma.io/)                     | Schema migrations, connection pooling (`@prisma/adapter-pg` + `pg`) |
| **Database**           | [PostgreSQL 17](https://www.postgresql.org/)           | Relational database with Foreign Key cascades and indexing          |
| **Auth & Security**    | `jsonwebtoken` + `bcryptjs`                            | HttpOnly cookie sessions, CORS with credentials                     |
| **Code Quality**       | ESLint + Prettier                                      | Unified formatting and linting across monorepo                      |

---

## 📁 Project Structure

```
todo-fullstack-app/
├── client/                      # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/          # Authentication routes (login, register)
│   │   │   ├── (dashboard)/     # Protected dashboard routes (/todos)
│   │   │   ├── icon.svg         # Branded vector favicon
│   │   │   ├── layout.tsx       # Root layout with fonts & QueryClientProvider
│   │   │   └── page.tsx         # Editorial landing hero
│   │   ├── components/
│   │   │   ├── auth/            # LoginForm, RegisterForm
│   │   │   ├── todos/           # TodoList, TodoItem, TodoForm, TodoFilter
│   │   │   └── ui/              # Button, Input, Badge
│   │   ├── hooks/               # useAuth, useTodos, useTodoMutations
│   │   ├── lib/                 # Axios client, QueryClient setup
│   │   ├── types/               # TypeScript interfaces
│   │   └── middleware.ts        # Edge JWT route protection
│   ├── .env.example
│   ├── eslint.config.mjs
│   └── package.json
│
├── server/                      # Express.js Backend
│   ├── prisma/
│   │   └── schema.prisma        # Database models (User, Todo, TodoStatus)
│   ├── src/
│   │   ├── controllers/         # auth.controller.ts, todo.controller.ts
│   │   ├── middleware/          # auth.middleware.ts, validate.middleware.ts
│   │   ├── routes/              # auth.routes.ts, todo.routes.ts
│   │   ├── schemas/             # auth.schema.ts, todo.schema.ts (Zod)
│   │   ├── lib/                 # prisma.ts (singleton client with pg pool)
│   │   └── index.ts             # Express application setup
│   ├── prisma.config.ts         # Prisma 7 client configuration
│   ├── .env.example
│   ├── eslint.config.mjs
│   └── package.json
│
├── .prettierrc                  # Monorepo code style configuration
├── .prettierignore
├── package.json                 # Root orchestration scripts (concurrently)
└── README.md
```

---

## ⚙️ Prerequisites

Before getting started, ensure you have installed:

- [Node.js](https://nodejs.org/) (v20.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (v16.x or v17.x running locally on port `5432`)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

---

## 🏁 Quickstart & Installation

### 1. Clone & Install Dependencies

From the repository root:

```bash
# Install root orchestration tools
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

---

### 2. Environment Variables

#### Backend (`server/.env`):

Copy the example environment file and set your PostgreSQL credentials:

```bash
cp server/.env.example server/.env
```

Default configuration (`server/.env`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_app"
JWT_SECRET="super-secret-jwt-key-todo-app-dev"
PORT=5000
```

#### Frontend (`client/.env.local`):

```bash
cp client/.env.example client/.env.local
```

Default configuration (`client/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### 3. Initialize Database & Run Migrations

Ensure PostgreSQL is running locally and the `todo_app` database exists, then run:

```bash
cd server
npx prisma migrate dev --name init
cd ..
```

---

### 4. Run Development Servers

Start both frontend and backend concurrently with a single command from the root directory:

```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

### 5. Production Build & Start

To build both client and server for production:

```bash
npm run build
npm run start
```

---

## 📡 API Reference

All protected endpoints require a valid JWT passed automatically via HttpOnly cookie `token`.

### Authentication (`/api/auth`)

| Method | Endpoint             |  Auth   | Description                            | Payload / Schema             |
| ------ | -------------------- | :-----: | -------------------------------------- | ---------------------------- |
| `POST` | `/api/auth/register` |   No    | Register new user account              | `{ email, password, name? }` |
| `POST` | `/api/auth/login`    |   No    | Login and receive HttpOnly cookie      | `{ email, password }`        |
| `POST` | `/api/auth/logout`   |   No    | Clear authentication cookie            | None                         |
| `GET`  | `/api/auth/me`       | **Yes** | Get current authenticated user profile | None                         |

### Tasks (`/api/todos`)

| Method   | Endpoint         |  Auth   | Description                               | Query / Body                              |
| -------- | ---------------- | :-----: | ----------------------------------------- | ----------------------------------------- |
| `GET`    | `/api/todos`     | **Yes** | List tasks with filters & pagination      | Query: `?status=&search=&page=1&limit=10` |
| `POST`   | `/api/todos`     | **Yes** | Create a new task                         | Body: `{ title, description?, status? }`  |
| `GET`    | `/api/todos/:id` | **Yes** | Retrieve single task                      | Params: `:id`                             |
| `PUT`    | `/api/todos/:id` | **Yes** | Update task title, description, or status | Body: `{ title?, description?, status? }` |
| `DELETE` | `/api/todos/:id` | **Yes** | Permanently remove a task                 | Params: `:id`                             |

---

## 🧪 Code Quality & Verification Scripts

| Command                | Action                                                                  |
| ---------------------- | ----------------------------------------------------------------------- |
| `npm run lint`         | Runs ESLint across both `server` and `client`                           |
| `npm run lint:fix`     | Automatically fixes auto-fixable lint issues                            |
| `npm run format:check` | Verifies code conforms to Prettier rules                                |
| `npm run format`       | Formats all code with Prettier                                          |
| `npm run build`        | Compiles server TypeScript (`tsc`) and builds Next.js production bundle |
