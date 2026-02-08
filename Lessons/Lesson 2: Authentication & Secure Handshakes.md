# Lesson 2: Authentication & Secure Session Management

## 📋 Overview

In this lesson, we implemented secure authentication using Supabase's server-side rendering (SSR) capabilities. This ensures user identities are managed via encrypted cookies rather than LocalStorage, providing better security.

---

## 🏗️ Project Structure

```
ui/src/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # Email confirmation handler
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard page
│   ├── login/
│   │   ├── actions.ts            # Login server action
│   │   ├── page.tsx              # Login UI
│   │   └── signup/
│   │       ├── actions.ts        # Signup server action
│   │       └── page.tsx          # Signup UI
│   ├── logout/
│   │   └── actions.ts            # Logout server action
│   └── middleware.ts             # Auth middleware (bouncer)
└── utils/
    └── supabase/
        ├── server.ts             # Server client (Head Chef)
        └── client.ts             # Browser client (Waiter)
```

---

## 🔐 Core Concepts

### 1. Server Client vs Browser Client

#### `server.ts` - The Head Chef 🧑‍🍳
The "Server" runs on Next.js's private cloud computer. It never leaves the server.

**What it does:**
- Checks user credentials before rendering pages
- Handles sensitive database operations
- Manages encrypted session cookies

```typescript
// ui/src/utils/supabase/server.ts
export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set(name, value, options) },
        remove(name, options) { cookieStore.set(name, '', options) },
      },
    }
  )
}
```

#### `client.ts` - The Waiter 🍽️
The "Client" runs in the user's browser. It's the messenger between the user and the system.

**What it does:**
- Handles user interactions (clicks, forms)
- Communicates with Supabase API
- Limited security privileges

```typescript
// ui/src/utils/supabase/client.ts
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

---

### 2. Server Actions (Secure Auth Functions)

#### Login Action
Handles user sign-in with validation and error reporting.

```typescript
// ui/src/app/login/actions.ts
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return redirect("/login?error=Please fill in all fields")
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  redirect("/dashboard")
}
```

#### Signup Action
Handles user registration with email confirmation.

```typescript
// ui/src/app/login/signup/actions.ts
export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (password.length < 6) {
    return redirect("/login?error=Password must be at least 6 characters")
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  redirect("/login?message=Check your email for the confirmation link")
}
```

#### Logout Action
Clears session cookies to prevent "Ghost Sessions."

```typescript
// ui/src/app/logout/actions.ts
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()  // Clears cookies server-side
  redirect("/login?message=Successfully signed out")
}
```

---

### 3. Middleware - The Bouncer 🚪

The middleware acts as a gatekeeper for protected routes.

**What it does:**
1. Intercepts every request
2. Checks if user is authenticated
3. Refreshes expired sessions
4. Redirects unauthorized users

```typescript
// ui/src/middleware.ts
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(...)
  const { pathname } = request.nextUrl
  const protectedRoutes = ['/dashboard']

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}
```

**Why `getUser()` over `getSession()`?**

| `getSession()` | `getUser()` |
|----------------|-------------|
| Fast visual ID check | Full background database check |
| Trusts cookie data | Verifies with Supabase in real-time |
| Can be tricked by stale data | Immediately detects revoked access |
| ⚠️ Less secure | ✅ More secure |

---

### 4. Auth Callback Handler

When users confirm their email, Supabase redirects to this handler to exchange the confirmation code for a session.

```typescript
// ui/src/app/auth/callback/route.ts
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createServerClient(...)
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
```

---

## 🔧 Troubleshooting

### Issue: Email Confirmation Link Expired

**Error:** `otp_expired` or `access_denied`

**Cause:** Email confirmation is enabled by default in Supabase.

**Solution for Development:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Find **"Confirm email"** and disable it
3. Delete existing user from Authentication → Users
4. Sign up again

**⚠️ Important for Production:**
- Email confirmation is **ENABLED** for Vercel deployment
- Users must confirm their email before they can login
- Check spam folder for confirmation emails
- The auth callback handler (`/auth/callback`) handles the confirmation link

### Email Confirmation Settings

| Environment | Email Confirmation | Notes |
|-------------|-------------------|-------|
| **Development** | ❌ Disabled | Faster testing, no email needed |
| **Production (Vercel)** | ✅ Enabled | Security best practice |

**✅ Production is now configured with email confirmation enabled!**

---

## ✅ What We Implemented

- [x] Server-side auth with `@supabase/ssr`
- [x] Encrypted cookie-based sessions
- [x] Login server action with validation
- [x] Signup server action with error handling
- [x] Logout with cookie clearing
- [x] Auth middleware for route protection
- [x] Protected dashboard page
- [x] Email confirmation callback handler
- [x] Smart home page redirect

---

## 🚀 Smart Home Page Redirect

We updated the home page (`page.tsx`) to automatically redirect users based on their authentication status:

```typescript
// ui/src/app/page.tsx
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")  // Logged in → Go to dashboard
  } else {
    redirect("/login")      // Not logged in → Go to login
  }
}
```

**How it works:**
1. User visits `http://localhost:3000`
2. Server checks if user is authenticated using `getUser()`
3. If **logged in** → redirects to `/dashboard`
4. If **not logged in** → redirects to `/login`

**Why this is better:**
- No more landing on a blank/default page
- Seamless user experience
- Authenticated users go directly to their content
- Unauthenticated users are guided to login

---

## 🎯 Next Steps

Proceed to **Lesson 3: Database Design & Row Level Security (RLS)** to:
- Create the `images` table schema
- Implement RLS policies for user data isolation
- Build server-side data fetching