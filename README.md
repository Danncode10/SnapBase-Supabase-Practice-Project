# SnapBase: Supabase Practice Project

SnapBase is a full-stack image management application built to master the Supabase ecosystem using a modern hybrid architecture: **Next.js** for the frontend and **FastAPI** for custom backend logic.

## 🚀 The Mission
The goal of this project is to implement the "Big Four" of Supabase (Auth, Database, Storage, and Realtime) while maintaining professional standards in environment security and deployment.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, Vercel
- **Backend:** FastAPI (Python), Pydantic
- **Database & Infrastructure:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Deployment:** Vercel (Frontend), Render/Railway (API)

---

## 📚 Detailed Lesson Plan

### 🟦 Lesson 1: The Foundation (Current)
* **Initialization:** Set up Next.js with Tailwind and Git.
* **Git Strategy:** Repository name `Supabase Practice Project` with a clean `.gitignore`.
* **Supabase Setup:** Create project and explore the Dashboard.
* **Environment Security:** * Setup `.env.local` for Next.js.
    * Setup `.env` for FastAPI.
    * Configure `NEXT_PUBLIC_` vs private variables.
* **Vercel Deployment:** Connect the repo for Continuous Deployment.

### 🟦 Lesson 2: Authentication & Secure Handshakes
* **Supabase Auth:** Email/Password setup.
* **JWT Flow:** Passing the Supabase User JWT from Next.js to FastAPI.
* **FastAPI Middleware:** Creating a dependency to verify user identity in Python.

### 🟦 Lesson 3: Database & Row Level Security (RLS)
* **Schema Design:** Building the `images` table via SQL Editor.
* **RLS Policies:** Writing SQL to restrict data access (User A cannot see User B's data).
* **Python Integration:** Using `supabase-py` to fetch data through FastAPI.

### 🟦 Lesson 4: Storage & Image Processing
* **Buckets:** Creating private storage buckets for user uploads.
* **Upload Workflow:** 1. Frontend uploads to Supabase Storage.
    2. Frontend notifies FastAPI of the new upload.
    3. FastAPI validates and updates the metadata in PostgreSQL.

### 🟦 Lesson 5: Realtime Magic & Polish
* **Realtime Subscriptions:** Using `supabase.channel()` to update the UI instantly without page refreshes.
* **Full Deployment:** Final environment variable sync and production testing.

---

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