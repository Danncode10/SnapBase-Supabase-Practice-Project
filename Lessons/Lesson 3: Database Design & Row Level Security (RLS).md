### 🟦 Lesson 3: Database Design & Row Level Security (RLS)

In this lesson, we focused on designing the database schema and implementing Row Level Security (RLS) for our image management application using Supabase and Next.js. 

#### Overview of What We Did
1. **Created the `images` Table**: 
   - We defined the structure of the `images` table, which includes fields for storing image metadata and user associations. The table was created with the following 

**Prompt:**
   ```
   Act as a Senior Database Architect. I am building a Supabase project. 
  First, read the Project Overview provided here: 
  <Overview.md Content>

  Task:
  1. Generate the PostgreSQL DDL (Data Definition Language) to create the tables, relationships, and foreign keys required.
  2. Use `uuid` for all primary keys and ensure `created_at` timestamps are included.
  3. Provide a clear, concise summary of the schema design.

  Output Format:
  - Provide the SQL code first.
  - Then, provide a section titled "Documentation for sql_instructions.md" which explains the table structures and relationships in plain English for my project records.
   ```

What we pasted in Supabase SQL Editor :
   ```sql
   CREATE TABLE images (
       id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
       created_at timestamptz DEFAULT now(),
       user_id uuid REFERENCES auth.users ON DELETE CASCADE,
       url text NOT NULL,
       name text NOT NULL,
       metadata jsonb
   );
   ```

   

1. **Enabled Row Level Security (RLS)**:
   
  **Prompt:**
  ```
  I have successfully run the table creation script in Supabase. Now, I need to secure the database using Row Level Security (RLS).

  Task:
  1. Generate the SQL to `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` for all tables mentioned in the Project Overview.
  2. Create specific RLS Policies (SELECT, INSERT, UPDATE, DELETE) that ensure users can only interact with data they own. 
  3. Use `auth.uid()` to verify user ownership.
  4. If there are public tables (read-only), specify those clearly.

  Output Format:
  - Provide the SQL blocks ready for the Supabase SQL Editor.
  - Provide a "Security Summary" for my `sql_instructions.md` that explains exactly what a user can and cannot do based on these policies.
  ```

   - We enabled RLS on the `images` table to ensure that users can only access their own records. This was done using the command:
   ```sql
   ALTER TABLE images ENABLE ROW LEVEL SECURITY;
   ```

2. **Created RLS Policies**:
   - We defined specific policies to enforce data access rules:
   ```sql
   CREATE POLICY "Select own images" 
   ON images 
   FOR SELECT 
   USING (user_id = auth.uid());

   CREATE POLICY "Insert own images" 
   ON images 
   FOR INSERT 
   WITH CHECK (user_id = auth.uid());

   CREATE POLICY "Delete own images" 
   ON images 
   FOR DELETE 
   USING (user_id = auth.uid());
   ```

#### Why Use Row Level Security (RLS)?
Row Level Security (RLS) is a powerful feature that allows you to control access to rows in a database table based on the characteristics of the user executing a query. This means that each user can only see and interact with their own data, enhancing security and privacy. For example, in our image management application, RLS ensures that users can only view, insert, or delete images that they own, preventing unauthorized access to other users' images.

#### How We'll Use AI + Supabase + Next.js

**Vibe Coding Prompt:**
```
Act as a Full-Stack Next.js and Supabase Expert. The backend is configured, and I need you to implement the frontend data fetching layer using the Next.js App Router.

**Objective:** Read `sql_instructions.md` to understand the schema and implement a high-performance React Server Component (RSC) to display data.

**Your Instructions:**
1. **Analyze Schema:** Read `sql_instructions.md`. Identify the columns and relationships for the [INSERT TABLE NAME] table.
2. **Setup Client:** Ensure the `@supabase/ssr` utility is configured. If the server client utility doesn't exist, create it.
3. **Create the Component:** - Create a new React Server Component in the appropriate `app/` directory.
   - Use `async/await` to fetch data directly from Supabase.
   - Implement strict TypeScript interfaces based on the table schema found in your analysis.
4. **Optimize for Streaming:** - Create a `loading.tsx` file in the same route or wrap the component in a `<Suspense>` boundary to prevent client-side waterfalls.
   - Ensure the UI starts rendering immediately while data is in flight.
5. **Error Handling:** Implement robust checks for Supabase errors and "No data found" states.

**Verification:**
- Once files are created, explain how this Server Component approach (fetching on the server) improves performance and SEO compared to a traditional client-side `useEffect` fetch.
- Run a build check or linting (if applicable) to ensure the new files are error-free.
```

- **AI Integration**: We will leverage AI to enhance user experience, such as providing intelligent recommendations based on user-uploaded images or automating metadata generation.
- **Supabase**: As our backend, Supabase will handle authentication, database management, and real-time data synchronization, allowing us to focus on building features without worrying about infrastructure.
- **Next.js**: This framework will enable us to create a seamless user interface with server-side rendering capabilities, ensuring fast load times and improved SEO.

By combining these technologies, we aim to build a robust image management application that is both user-friendly and secure.

### Next Steps
Now that we have set up the database and security measures, we will proceed to implement server-side data fetching to display images in our application.