# 📋 Technical Specification: Full-Stack TODO App

Requirements specification for building a full-featured task management web application (TODO).

---

## 🎯 Task Description

Develop a reliable, straightforward task management application (TODO) featuring end-to-end user authentication, client-server architecture, and persistent data storage in a relational database.

---

## 🔹 Functional Requirements

### 1. User Authentication (JWT)

- **Registration:** Create a new user account (name, email, secure password).
- **Login:** User verification with hashed password validation (bcrypt).
- **JWT Authorization:** Issue JSON Web Tokens (JWT) and protect private API routes.
- Secure token storage in **HttpOnly Cookies** to mitigate XSS vulnerabilities.
- Automatic Edge redirect for unauthenticated visitors attempting to access protected routes.

### 2. Task CRUD Operations

- **Create:** Add a new task with a title and optional multiline description.
- **Read:** View a list of user-owned tasks with metadata (creation date, time, status).
- **Update:** Edit task title, description, status, and pin priority.
- **Delete:** Permanently remove a task with a confirmation modal dialogue.
- **Task Statuses:**
  - `TODO` — Planned / Pending.
  - `IN_PROGRESS` — Currently being worked on.
  - `DONE` — Completed.

### 3. Task Listing, Filtering & Search

- Interactive status tab filtering (`All Tasks`, `To Do`, `In Progress`, `Completed`).
- 1-click status cycling directly from the task card.
- Synchronize active filter with `localStorage` and URL query parameters to persist state across page reloads.
- Live keyword search querying titles and descriptions on the server.
- Server-side pagination for optimal performance with large datasets.

### 4. Database

- Relational Database Management System: **PostgreSQL**.
- User-to-tasks relationship mapping (1-to-many: User -> Todos).
- Schema migrations with indexing on critical lookup fields (`userId`, `status`, `createdAt`, `isPinned`).

### 5. Frontend

- Framework: **Next.js (App Router)** + **React** + **TypeScript**.
- Server State & API Layer: **TanStack Query (React Query)** for caching, optimistic updates, and background synchronization.
- Styling: **Tailwind CSS** with a warm editorial design system and smooth keyframe micro-interactions.
- Form Validation: **React Hook Form** + **Zod**.

### 6. Backend

- Runtime & Framework: **Node.js** + **Express.js** (TypeScript).
- ORM: **Prisma ORM** (type-safe modern Sequelize alternative) with `@prisma/adapter-pg`.
- Request Validation: **Zod** middleware for strict schema validation (body, query, params).
- Architecture: Modular three-tier architecture (Routes → Controllers → Prisma Models / Services).