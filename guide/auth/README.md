# Panduan Autentikasi Better Auth

Sistem autentikasi menggunakan Better Auth dengan adapter Drizzle. Panduan ini wajib diikuti agar tidak terjadi kesalahan impor modul server di Client Component.

## Aturan Utama

### Hal yang Harus Dilakukan
- Gunakan authClient hanya di Client Component.
- Gunakan auth.api.getSession atau helper getSession dan withAuth di Server Component, Server Action, dan Route Handler.
- Pastikan berkas konfigurasi Better Auth di server mendukung variabel lingkungan BETTER_AUTH_URL dan BETTER_AUTH_BASE_URL.

### Hal yang Dilarang
- Jangan mengimpor auth server di Client Component. Hal ini menyebabkan kegagalan kompilasi karena modul database terbawa ke browser bundle.
- Jangan menuliskan BETTER_AUTH_SECRET di Client Component.

## Berkas Konfigurasi Utama

- lib/auth/auth.ts: Konfigurasi server.
- lib/auth/auth-client.ts: SDK untuk Client Component.
- app/api/auth/[...better-auth]/route.ts: Route Handler untuk API autentikasi.
- lib/auth/auth-helper.ts: Helper server untuk proteksi halaman.

## Alur Kerja Implementasi

1. Buat tampilan login atau register menggunakan authClient.
2. Amankan Server Component dengan getSession atau middleware.
3. Amankan Route Handler dengan memeriksa headers menggunakan auth.api.getSession.
4. Jalankan pemeriksaan tipe dengan tsc untuk memastikan tidak ada kesalahan impor.

## Contoh Kode

### Client Component

```tsx
"use client";

import { signIn, signOut, useSession } from "@/lib/auth/auth-client";
import { useState } from "react";
import { IconBrandGoogle, IconLogout, IconLoader } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Gagal masuk:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return <IconLoader className="animate-spin text-muted-foreground" size={20} />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Halo, {session.user.name}</span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          <IconLogout size={16} className="mr-2" /> Keluar
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} className="gap-2">
      <IconBrandGoogle size={18} />
      Masuk dengan Google
    </Button>
  );
}
```

### Server Component

```tsx
import { getSession } from "@/lib/auth/auth-helper";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Selamat datang kembali, {session.user.name} ({session.user.email})</p>
    </div>
  );
}
```

### Route Handler

```ts
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "Success", user: session.user });
  } catch (error) {
    console.error("Kesalahan API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```
