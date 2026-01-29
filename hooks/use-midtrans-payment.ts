"use client";

import { useState } from "react";
import { toast } from "sonner";

interface UseMidtransPaymentProps {
  amount: number;
}

export function useMidtransPayment({ amount }: UseMidtransPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (): Promise<boolean> => {
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.token) {
        window.open(`https://app.sandbox.midtrans.com/snap/v2/vtweb/${data.token}`, '_blank');
        return true;
      } else {
        const errorMsg = data.error || 'Payment failed. Please try again.';
        toast.error(errorMsg);
        return false;
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePayment,
    isLoading,
  };
}