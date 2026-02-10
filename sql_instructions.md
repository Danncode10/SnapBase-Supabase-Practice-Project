# SQL Instructions

## Schema Design - `images` Table
This table stores metadata for images uploaded by users.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique identifier for the image |
| `created_at` | `timestamptz` | `DEFAULT now()` | Timestamp of when the record was created |
| `user_id` | `uuid` | `REFERENCES auth.users`, `ON DELETE CASCADE` | ID of the user who owns the image |
| `url` | `text` | `NOT NULL` | URL of the image stored in Supabase Storage |
| `name` | `text` | `NOT NULL` | Original name or title of the image |
| `metadata` | `jsonb` | | Additional metadata (dimensions, file type, etc.) |

## Row Level Security (RLS)
The `images` table has RLS enabled to ensure users only access their own data.

### Policies:
- **Select own images**: Users can only `SELECT` rows where `user_id` matches their own `auth.uid()`.
- **Insert own images**: Users can only `INSERT` rows where `user_id` matches their own `auth.uid()`.
- **Delete own images**: Users can only `DELETE` rows where `user_id` matches their own `auth.uid()`.

## DDL (Data Definition Language)
```sql
CREATE TABLE images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    user_id uuid REFERENCES auth.users ON DELETE CASCADE,
    url text NOT NULL,
    name text NOT NULL,
    metadata jsonb
);

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Select own images" ON images FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Insert own images" ON images FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Delete own images" ON images FOR DELETE USING (user_id = auth.uid());
```
