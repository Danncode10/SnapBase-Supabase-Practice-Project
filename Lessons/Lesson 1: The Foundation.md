# Lesson 1: The Foundation

Welcome to Lesson 1 of the SnapBase project! This lesson focuses on setting up the core infrastructure for our full-stack image management application. We'll build the foundation using Next.js for the frontend, Supabase for the backend, and Vercel for deployment.

## 🎯 Learning Objectives

By the end of this lesson, you'll have:
- A Next.js application with TypeScript and Tailwind CSS
- A Git repository with proper configuration
- A Supabase project set up
- Environment variables configured securely
- Continuous deployment on Vercel

## 📋 Prerequisites

- Node.js installed (version 18 or later)
- Git installed
- A GitHub account
- A Vercel account (optional, but recommended)

## 🚀 Step 1: Initialize the Next.js Project

Let's start by creating a new Next.js application with the recommended settings.

### Create the Project

Run the following command in your terminal:

```bash
npx create-next-app@latest ui
```

When prompted, select these options:
- **TypeScript**: Yes
- **ESLint**: Yes
- **Tailwind CSS**: Yes
- **src/ directory**: Yes
- **App Router**: Yes
- **Import alias**: Yes (default @/*)

This creates a `ui/` directory with a fully configured Next.js app.

### Test the Setup

Navigate to the project and start the development server:

```bash
cd ui
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the default Next.js welcome page.

## 📝 Step 2: Set Up Git and Repository

### Initialize Git

If not already done, initialize Git in your project root:

```bash
git init
```

### Create .gitignore

Ensure your `.gitignore` file includes the following (it should be created automatically by Next.js):

```
# Dependencies
/node_modules
/.pnp
.pnp.*

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### Commit Your Changes

```bash
git add .
git commit -m "Initial commit: Next.js app with TypeScript and Tailwind"
```

### Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it something like `SnapBase-Supabase-Practice-Project`
3. Don't initialize with README, .gitignore, or license
4. Push your code:

```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## 🗄️ Step 3: Set Up Supabase

Supabase provides our database, authentication, and storage backend.

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in the details:
   - **Name**: SnapBase Practice (or similar)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Click "Create Project"

Wait 2-3 minutes for the project to initialize.

### Explore the Dashboard

Once created, explore the Supabase dashboard:
- **Project Settings**: General project info
- **Database**: PostgreSQL database management
- **Authentication**: User management
- **Storage**: File storage buckets
- **API**: REST and GraphQL endpoints
- **Logs**: Monitor your application

## 🔐 Step 4: Configure Environment Variables

Environment variables securely store sensitive information like API keys.

### For Next.js (Frontend)

Create `ui/.env.local` with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**How to get these values:**
1. In your Supabase dashboard, go to **Settings > API**
2. Copy the **Project URL** for `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy the **service_role secret** key for `SUPABASE_SERVICE_ROLE_KEY`

**Important Notes:**
- `NEXT_PUBLIC_` prefix makes variables accessible in the browser
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Service role keys should only be used server-side

### For FastAPI (Backend - Future)

Later, we'll create a `.env` file in the root for our Python backend:

```env
# FastAPI Environment Variables
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://username:password@localhost/dbname
FASTAPI_SECRET_KEY=your_secret_key_here
```

## 🚀 Step 5: Deploy to Vercel

Vercel provides seamless deployment for Next.js applications with automatic scaling and global CDN.

### Connect Your Repository

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Root Directory**: `ui` (since Next.js is in a subdirectory)
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

### Add Environment Variables

In your Vercel project settings:
1. Go to **Settings > Environment Variables**
2. Add the same variables as in `ui/.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Deploy

Click "Deploy" to build and deploy your application. Vercel will provide a live URL (e.g., `https://your-app.vercel.app`).

### Continuous Deployment

Any future commits to your `main` branch will automatically trigger a new deployment. This is called **continuous deployment**.

## ✅ Lesson Complete!

Congratulations! You've successfully set up the foundation for SnapBase. Your Next.js application is now live on Vercel with Supabase integration ready.

### What You Accomplished

- ✅ Next.js app with TypeScript and Tailwind CSS
- ✅ Git repository with proper configuration
- ✅ Supabase project and dashboard exploration
- ✅ Secure environment variable setup
- ✅ Vercel deployment with continuous integration

### Next Steps

Ready for Lesson 2: Authentication & Secure Handshakes? We'll implement user login/signup with Supabase Auth.

### Troubleshooting

- **Build fails on Vercel**: Check that environment variables are set correctly
- **Supabase connection issues**: Verify your API keys and URL
- **Git push issues**: Ensure your remote is set up correctly

Happy coding! 🎉