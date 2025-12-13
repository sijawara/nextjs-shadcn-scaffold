"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMidtransPayment } from "@/hooks/use-midtrans-payment";

interface MidtransPaymentProps {
  amount?: number;
}

export default function MidtransPayment({ amount: initialAmount = 10000 }: MidtransPaymentProps) {
  const [amount, setAmount] = useState(initialAmount.toString());
  const paymentAmount = parseInt(amount) || 0;
  const { handlePayment, isLoading, error } = useMidtransPayment({ amount: paymentAmount });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Midtrans Payment</CardTitle>
        <CardDescription>Enter the amount and proceed to payment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount (IDR)
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
          />
        </div>
        <Button onClick={handlePayment} className="w-full" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay with Midtrans'}
        </Button>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}