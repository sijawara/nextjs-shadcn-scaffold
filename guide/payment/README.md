# Payment Guide (Midtrans)

Integrasi pembayaran menggunakan **Midtrans Snap**.

## Setup Environment
Tambahkan di `.env`:
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-...
MIDTRANS_CLIENT_KEY=SB-Mid-client-...
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-...
```

## Workflow Pembayaran
1. Backend: Buat `Snap Token`.
2. Frontend: Panggil modal Snap menggunakan library client Midtrans.

## Contoh API (Backend)
```ts
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function createTransaction(orderId: string, amount: number) {
    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: amount
        },
    };

    const transaction = await snap.createTransaction(parameter);
    return transaction.token;
}
```

## Contoh Frontend
Pastikan mengimpor Snap script di `layout.tsx` atau secara dinamis.

```tsx
const pay = (token: string) => {
    window.snap.pay(token, {
        onSuccess: (result) => { /* handle success */ },
        onPending: (result) => { /* handle pending */ },
        onError: (result) => { /* handle error */ },
    });
};
```

## Keamanan
Selalu gunakan **Webhook** untuk memproses status pembayaran di backend, jangan bergantung pada callback client-side saja.
