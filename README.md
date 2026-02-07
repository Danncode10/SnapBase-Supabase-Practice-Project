# SnapBase: Supabase Practice Project

SnapBase is a full-stack image management application built to master the Supabase ecosystem using a modern hybrid architecture: **Next.js** for the frontend and **Next.js** for custom backend logic.

## 🚀 The Mission
The goal of this project is to implement the "Big Four" of Supabase (Auth, Database, Storage, and Realtime) while maintaining professional standards in environment security and deployment.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, Vercel
- **Backend:** Next.js (JavaScript)
- **Database & Infrastructure:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Deployment:** Vercel (Frontend), Render/Railway (API)

---

## 📚 Detailed Lesson Plan

## 🟦 Lesson 1: The Foundation (Updated)

* **Initialization:** Set up Next.js 15 (App Router) with Tailwind CSS and Git.
* **Git Strategy:** Repository named `Supabase Practice Project` with a root `.gitignore`.
* **Supabase Setup:** Project creation and configuration in the Supabase Dashboard.
* **Environment Security:** * Setup `ui/.env.local` for all environment variables.
* Use `NEXT_PUBLIC_` for browser-accessible keys (URL/Anon Key).
* Keep the `SERVICE_ROLE` key strictly for server-side use only.


* **Vercel Deployment:** Connect the repository for automatic deployment.

### **Project Structure (Finalized)**

Everything is now consolidated into the `ui/` folder. **Delete the `backend/` folder** to keep the project clean.

```text
/ (Project Root)
├── .gitignore             # Ignores .env, node_modules, .next, etc.
└── ui/                    # The Entire App (Next.js)
    ├── src/               # All application logic
    │   ├── app/           # Routes, Layouts, and Server Actions
    │   │   ├── login/     # Login Page
    │   │   └── api/       # (Optional) Route Handlers
    │   └── utils/         # Supabase client configurations
    │       └── supabase/  # server.ts & client.ts
    ├── .env.local         # Your Supabase Keys
    └── package.json

```

### 🟦 Lesson 2: Authentication & Secure Session Management

* **Server-Side Auth (SSR):** ✅ Implemented the `@supabase/ssr` package (server.ts and client.ts)
identities via encrypted cookies rather than LocalStorage.
* **Authentication Server Actions:** ✅ Implemented server-side auth actions
* **Secure Signup/Login:** ✅ Server-side functions with validation and error reporting
* **Logout Logic:** ✅ Clearing session cookies to prevent "Ghost Sessions"


* **Edge Middleware Gatekeeper:**
* Writing a global `middleware.ts` to intercept requests, refresh expired sessions in the background, and redirect unauthorized users away from protected routes.


* **User Context:** Leveraging `supabase.auth.getUser()` to ensure high-security verification of the JWT on the server.

### 🟦 Lesson 3: Database Design & Row Level Security (RLS)

* **Relational Schema Design:**
* Building the `images` table: `id` (uuid), `created_at` (timestamptz), `user_id` (uuid -> auth.users), `url` (text), `name` (text), and `metadata` (jsonb).


* **RLS (Row Level Security) Implementation:**
* Writing SQL policies to enforce **Identity Isolation**:
* `SELECT`: Users can only view records where `user_id = auth.uid()`.
* `INSERT`: Users can only create records where the `user_id` matches their own UUID.
* `DELETE`: Users can only remove their own records.


* **Server-Side Data Fetching:** Utilizing `async/await` in React Server Components (RSC) to stream data directly from the database to the UI without client-side waterfalls.

### 🟦 Lesson 4: Storage Engineering & Atomic Metadata

* **Private Storage Buckets:** Creating a non-public `media` bucket for storing high-resolution assets.
* **High-Performance Upload Workflow:**
* **Direct-to-S3:** Engineering the frontend to upload files directly to Supabase Storage, bypassing Vercel’s execution limits.


* **Atomic Transactions:**
* Designing a "Two-Pass" system: Uploading the file first, then calling a Server Action to commit the generated URL and file metadata to the PostgreSQL database.


* **File Security:** Implementing policies to prevent unauthorized file access even if the direct URL is leaked.

### 🟦 Lesson 5: Realtime Synchronization & Optimistic UI

* **Postgres Changes (CDC):** Enabling Change Data Capture on the `images` table to broadcast updates.
* **Supabase Realtime Channel:**
* Implementing `supabase.channel().on('postgres_changes')` to sync the UI across multiple devices in real-time.


* **Optimistic UI Updates:**
* Using the `useOptimistic` hook to provide immediate visual confirmation of deletes or uploads.
* Implementing "Rollback" logic if the server-side operation fails.


* **Production Hardening:**
* Final audit of environment variables.
* Implementing `robots.txt` and SEO metadata for the municipality launch.


## 🔐 Environment Best Practices
To keep this project secure:
1.  **NEVER** commit your `.env` files to Git.
2.  Use the provided `.env.example` as a template for new environments.
3.  Server-side keys (Service Role keys) must **never** be prefixed with `NEXT_PUBLIC_`.

---

## 🎨 UI/UX Goals
* **Clean Masonry Grid:** A responsive gallery for uploaded images.
* **Auth States:** Distinct "Guest" and "User" views.
* **Optimistic UI:** Visual feedback when an image is being uploaded.