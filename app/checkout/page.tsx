"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-context'
import { useMidtransPayment } from '@/hooks/use-midtrans-payment'

export default function CheckoutPage() {
  const { items, clearCart, getTotal } = useCartStore()
  const router = useRouter()
  const total = getTotal()
  const { handlePayment, isLoading, error } = useMidtransPayment({ amount: total })

  const handleCheckout = async () => {
    await handlePayment()
    // Clear cart after payment (in a real app, you'd wait for payment confirmation)
    clearCart()
    router.push('/')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Complete your purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to Midtrans to complete your payment securely.
                  </p>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : `Pay Rp ${total.toLocaleString('id-ID')}`}
                </Button>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}