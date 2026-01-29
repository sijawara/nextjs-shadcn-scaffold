import { NextRequest, NextResponse } from 'next/server';

const midtransClient = require('midtrans-client');

export async function POST(request: NextRequest) {
  const { amount = 10000 } = await request.json();

  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  if (!serverKey) {
    return NextResponse.json(
      { error: 'Midtrans Server Key is not configured. Please add MIDTRANS_SERVER_KEY to your environment variables.' },
      { status: 500 }
    );
  }

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
  });

  const parameter = {
    transaction_details: {
      order_id: 'order-id-' + Math.round((new Date()).getTime() / 1000),
      gross_amount: amount,
    },
    credit_card: {
      secure: true,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}