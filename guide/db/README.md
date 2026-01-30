# Database Guide (Drizzle + Turso)

Data layer menggunakan **Drizzle ORM** dengan **libSQL (Turso)** sebagai database SQLite-nya.

## Struktur File
- `db/schema.ts`: Definisi tabel dan relasi.
- `db/index.ts`: Koneksi database instance.
- `drizzle.config.ts`: Konfigurasi generator migrasi.

## Workflow Perubahan Schema
1. Ubah file `db/schema.ts`.
2. Push langsung ke database (Development):
   ```bash
   pnpm db:push
   ```
3. Generate file SQL migrasi (Production):
   ```bash
   pnpm db:generate
   ```

## Contoh Query
```ts
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

// Ambil semua user
const allUsers = await db.select().from(user);

// Ambil dengan filter
const singleUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, "123")
});

// Insert data
await db.insert(user).values({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
```

## Tips Modern
Pastikan selalu menggunakan **Relations API** dari Drizzle jika schema Anda kompleks untuk kemudahan query nested data.
