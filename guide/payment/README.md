# Panduan Integrasi Pembayaran Midtrans

Integrasi sistem pembayaran menggunakan gateway Midtrans Snap. Panduan ini wajib diikuti agar transaksi berjalan dengan aman, status tervalidasi dengan benar, dan mencegah manipulasi status transaksi dari sisi klien.

## Aturan Utama

### Hal yang Harus Dilakukan
- Gunakan Webhook untuk memproses pembaruan status pembayaran di database.
- Validasi Signature Key pada request webhook yang masuk untuk memastikan data otentik berasal dari Midtrans.
- Gunakan midtrans-client di sisi server untuk berinteraksi dengan API Midtrans secara aman.
- Periksa status transaksi secara berkala. Pastikan nominal dan order_id yang diterima cocok dengan data internal di database.

### Hal yang Dilarang
- Jangan memperbarui status transaksi di database hanya berdasarkan respons pengalihan dari browser klien. Klien dapat memanipulasi parameter URL atau respons AJAX.
- Jangan mengekspos MIDTRANS_SERVER_KEY di browser klien. Kunci privat ini hanya boleh digunakan di lingkungan server.

## Alur Kerja Transaksi

1. Pembuatan Order: Klien meminta checkout -> server membuat data order di database dengan status PENDING, lalu memanggil API Midtrans untuk mendapatkan snapToken.
2. Pembayaran UI: Klien memanggil modal pembayaran Midtrans menggunakan snapToken yang diperoleh.
3. Penyelesaian Transaksi: User menyelesaikan pembayaran di portal Midtrans.
4. Validasi Webhook: Midtrans mengirimkan notifikasi HTTP POST ke server Anda. Server memvalidasi signature key, mencocokkan data, lalu memperbarui status order menjadi PAID atau FAILED.

## Contoh Kode

### Pembuatan Snap Token (`app/api/payment/checkout/route.ts`)

```ts
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
});

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, orderId } = await req.json();

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(amount),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: session.user.name,
        email: session.user.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({ token: transaction.token });
  } catch (error: any) {
    console.error("Kesalahan checkout:", error);
    return NextResponse.json({ error: error.message || "Checkout failed" }, { status: 500 });
  }
}
```

### Integrasi Modal Pembayaran di Client

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconCreditCard, IconLoader } from "@tabler/icons-react";

export function PaymentButton({ orderId, amount }: { orderId: string; amount: number }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";

    const script = document.createElement("script");
    script.src = midtransScriptUrl;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal membuat transaksi");

      window.snap.pay(data.token, {
        onSuccess: (result: any) => {
          alert("Pembayaran berhasil!");
        },
        onPending: (result: any) => {
          alert("Menunggu pembayaran...");
        },
        onError: (result: any) => {
          alert("Pembayaran gagal!");
        },
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="gap-2">
      {loading ? <IconLoader className="animate-spin" size={16} /> : <IconCreditCard size={16} />}
      Bayar Sekarang (Rp {amount.toLocaleString()})
    </Button>
  );
}
```

### Route Handler Webhook (`app/api/payment/webhook/route.ts`)

```ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const notification = await req.json();
    
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const payload = notification.order_id + notification.status_code + notification.gross_amount + serverKey;
    const computedSignature = crypto.createHash("sha512").update(payload).digest("hex");

    if (computedSignature !== notification.signature_key) {
      return NextResponse.json({ error: "Invalid signature key" }, { status: 403 });
    }

    const { order_id, transaction_status, fraud_status } = notification;

    console.log(`[PAYMENT-WEBHOOK] Order ${order_id} status: ${transaction_status}`);

    let localStatus = "PENDING";

    if (transaction_status === "capture" || transaction_status === "settlement") {
      if (fraud_status === "challenge") {
        localStatus = "CHALLENGED";
      } else {
        localStatus = "PAID";
      }
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      localStatus = "FAILED";
    }

    await db.update(orders)
      .set({ status: localStatus })
      .where(eq(orders.id, order_id));

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Gagal memproses webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```
