# Lesson 2: Authentication & Secure Handshakes

What I did is created src/utils/supabase

with client.ts and server.ts
1. The client.ts (The Waiter)
The "Client" is the Browser (Chrome, Safari on the user's laptop).
The Concept: The code in client.ts lives in the user's browser. It’s like a Waiter standing at the table.
What it does: When the user clicks a "Login" button, the Waiter (client.ts) takes the order and runs it back to the kitchen (Supabase).
Why it's limited: The Waiter can see what the user is doing, but he doesn't have the keys to the pantry or the heavy-duty equipment in the back. He’s just the "messenger" between the person at the table and the system.
2. The server.ts (The Head Chef)
The "Server" is Next.js's private computer (the cloud).
The Concept: The code in server.ts never leaves the kitchen. The user never sees it. It’s like the Head Chef.
What it does: Before a page is even sent to the user's screen, the Head Chef (server.ts) looks at the order. He checks the "ID Cards" (Cookies) to see if the user is a VIP. If they are, he prepares a "VIP Dashboard" meal. If they aren't, he tells the Waiter to kick them out.
Why it's powerful: Because it runs in the "back of the house," it is much more secure. It can handle sensitive tasks (like checking private database records) that you wouldn't want a Waiter (the browser) doing out in the open.


- __Install `@supabase/ssr`__ - Add the package for cookie-based auth

- __Create server actions:__

  - `signup.ts` - Handle user registration with proper error reporting
  - `login.ts` - Handle sign-in with validation
  - `logout.ts` - Clear session cookies to prevent "Ghost Sessions"

- __Create UI pages:__

  - `/login/page.tsx` - Login form
  - `/login/signup/page.tsx` - Signup form
