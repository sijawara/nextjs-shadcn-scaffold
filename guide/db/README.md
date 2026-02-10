# Database Guide (Drizzle ORM + Turso)

Dokumentasi ini menjelaskan pengelolaan data layer menggunakan **Drizzle ORM** dengan **Turso (libSQL)** sebagai database SQLite terdistribusi.

## 🛠 Struktur File

* `db/schema.ts`: Definisi tabel, relasi, dan tipe data TypeScript.
* `db/index.ts`: Inisialisasi koneksi database menggunakan `@libsql/client`.
* `drizzle.config.ts`: Konfigurasi utama untuk Drizzle Kit (generator migrasi).
* `.env`: Penyimpanan kredensial sensitif (URL & Auth Token).

---

## ⚙️ Konfigurasi Database

### 1. Setup Environment

Pastikan file `.env` kamu memiliki variabel berikut:

```env
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-secret-auth-token

```

### 2. Drizzle Config (`drizzle.config.ts`)

Konfigurasi ini digunakan oleh Drizzle Kit untuk proses migrasi dan *prototyping*.

```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'turso', // Dialek khusus untuk optimasi Turso/libSQL
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});

```

---

## 🔄 Workflow Perubahan Schema

### A. Development (Iterasi Cepat)

Gunakan perintah ini untuk langsung menyelaraskan database dengan schema tanpa membuat file migrasi. Cocok untuk fase awal pengembangan.

```bash
pnpm db:push

```

### B. Production (Migrasi Terkontrol)

1. **Generate**: Buat file SQL migrasi berdasarkan perubahan di `schema.ts`.
```bash
pnpm db:generate

```


2. **Migrate**: Terapkan file SQL tersebut ke database production.
```bash
pnpm db:migrate

```



---

## 🚀 Contoh Penggunaan (Query)

### Koneksi Database (`db/index.ts`)

```ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });

```

### Operasi CRUD

```ts
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

// 1. Ambil semua user
const allUsers = await db.select().from(user);

// 2. Ambil dengan filter (Type-safe)
const singleUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, "123"),
    with: { posts: true } // Mengambil relasi jika menggunakan Relations API
});

// 3. Insert data
await db.insert(user).values({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
});

```

---

## 💡 Tips Modern & Best Practices

* **Relations API**: Selalu definisikan `relations` di `schema.ts` untuk mempermudah query data bersarang (*nested data*) tanpa perlu join manual yang rumit.
* **Batch Operations**: Turso mendukung transaksi batch. Jika ingin melakukan banyak insert, gunakan `db.batch([...])` untuk performa lebih maksimal di *edge network*.
* **Zod Integration**: Gunakan `drizzle-zod` untuk membuat skema validasi form secara otomatis dari skema database Anda.
