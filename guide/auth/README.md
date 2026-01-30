# Auth Guide (Better Auth)

Sistem autentikasi menggunakan **Better Auth** dengan adapter **Drizzle**.

## Konfigurasi
File utama:
- `lib/auth/auth.ts`: Konfigurasi server.
- `lib/auth/auth-client.ts`: SDK untuk sisi client.
- `app/api/auth/[...better-auth]/route.ts`: API handler.

## Penggunaan di Client-Side
Gunakan `authClient` atau helper yang sudah diekspor:

```tsx
"use client";
import { signIn, signUp, signOut, useSession } from "@/lib/auth/auth-client";

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Logout</button>;
  }

  return (
    <button onClick={() => signIn.social({ provider: "google" })}>
      Login with Google
    </button>
  );
}
```

## Penggunaan di Server-Side
Gunakan helper `withAuth` untuk proteksi halaman atau `getSession` untuk data:

```tsx
import { withAuth, getSession } from "@/lib/auth/auth-helper";

export default async function Dashboard() {
  // Proteksi otomatis (redirect jika tidak login)
  const session = await withAuth("/login");
  
  return <h1>Welcome, {session.user.name}</h1>;
}
```

## Proteksi API Route
```ts
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
    // Logic selanjutnya...
}
```
