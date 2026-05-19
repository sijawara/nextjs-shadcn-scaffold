# Panduan Database Drizzle ORM dan Turso

Dokumentasi ini menjelaskan pengelolaan database menggunakan Drizzle ORM dengan Turso (libSQL). Panduan ini wajib diikuti agar integritas data dan keamanan tipe tetap terjaga.

## Aturan Utama

### Hal yang Harus Dilakukan
- Gunakan Relations API untuk query relasional. Cara ini lebih aman dibanding menulis join manual.
- Selalu jalankan pemeriksaan tipe menggunakan tsc setelah mengubah skema database.
- Gunakan query builder bawaan Drizzle atau binding parameter untuk mencegah SQL Injection.
- Gunakan operasi batch jika ingin memproses banyak data sekaligus untuk menghemat latensi.

### Hal yang Dilarang
- Jangan menyisipkan input pengguna secara langsung ke raw SQL query. Gunakan helper sql jika terpaksa menulis SQL mentah.
- Jangan melakukan query database di dalam presentational component. Pindahkan query ke Server Component, Route Handler, atau Server Action.

## Struktur Berkas

- db/schema.ts: Definisi tabel dan relasi.
- db/index.ts: Inisialisasi koneksi database.
- drizzle.config.ts: Konfigurasi Drizzle Kit.

## Alur Kerja Modifikasi Skema

1. Ubah skema database di db/schema.ts.
2. Jalankan pnpm db:push di lingkungan pengembangan lokal untuk menyelaraskan database.
3. Jalankan pnpm db:generate diikuti pnpm db:migrate di lingkungan production untuk menerapkan migrasi formal.
4. Verifikasi seluruh berkas kode dengan tsc untuk memastikan tidak ada tipe data yang bermasalah.

### Alternatif Jika db:push Gagal atau Memerlukan Konfirmasi

Jika pnpm db:push gagal, macet, atau meminta konfirmasi interaktif karena perubahan skema yang berisiko menghapus data, lakukan eksekusi SQL secara manual:

1. Buat berkas migrasi SQL secara non-interaktif:
   ```bash
   pnpm db:generate
   ```
2. Temukan berkas SQL migrasi terbaru di dalam folder drizzle (misalnya: drizzle/0000_xxxx.sql).
3. Buat dan jalankan skrip Node.js untuk mengeksekusi SQL tersebut:
   ```ts
   import { createClient } from "@libsql/client";
   import fs from "fs";
   const client = createClient({
     url: process.env.TURSO_CONNECTION_URL!,
     authToken: process.env.TURSO_AUTH_TOKEN
   });
   const sql = fs.readFileSync("drizzle/0000_xxxx.sql", "utf8");
   for (const statement of sql.split(";")) {
     if (statement.trim()) {
       await client.execute(statement);
     }
   }
   ```
   Jalankan skrip tersebut menggunakan npx tsx <nama_berkas_skrip>.




## Contoh Kode

### Definisi Skema dan Relasi (`db/schema.ts`)

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

### Operasi CRUD

```ts
import { db } from "@/db";
import { users, posts } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function getUserWithPosts(userId: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: {
        orderBy: [desc(posts.createdAt)],
        limit: 10,
      },
    },
  });
}

export async function createNewUserWithWelcomePost(
  userId: string,
  name: string,
  email: string
) {
  return await db.transaction(async (tx) => {
    await tx.insert(users).values({
      id: userId,
      name,
      email,
      createdAt: new Date(),
    });

    await tx.insert(posts).values({
      id: `post-${userId}`,
      title: "Selamat Datang",
      content: "Terima kasih telah bergabung dengan platform kami.",
      authorId: userId,
      createdAt: new Date(),
    });
  });
}

export async function deletePostSecurely(postId: string, userId: string) {
  return await db
    .delete(posts)
    .where(and(eq(posts.id, postId), eq(posts.authorId, userId)));
}
```
