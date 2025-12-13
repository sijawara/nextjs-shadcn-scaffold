"use client";

import { useState } from "react";

interface UseMidtransPaymentProps {
  amount: number;
}

export function useMidtransPayment({ amount }: UseMidtransPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      if (data.token) {
        window.open(`https://app.sandbox.midtrans.com/snap/v2/vtweb/${data.token}`, '_blank');
      } else {
        setError('Error: ' + data.error);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePayment,
    isLoading,
    error,
  };
}