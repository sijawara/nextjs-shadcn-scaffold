"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartProps {
  items: CartItem[]
  onRemoveItem?: (id: string) => void
  onUpdateQuantity?: (id: string, quantity: number) => void
}

export function Cart({ items, onRemoveItem, onUpdateQuantity }: CartProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative overflow-visible"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCartIcon className="h-4 w-4" />
        {items.length > 0 && (
          <span className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-2/3 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground ring-2 ring-background pointer-events-none z-10">
            {items.length}
          </span>
        )}
        <span className="sr-only">Open cart</span>
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              Review your items and proceed to checkout.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 py-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity?.(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onRemoveItem?.(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between font-semibold">
                <span>Total:</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full mt-4" onClick={() => setIsOpen(false)}>Proceed to Checkout</Button>
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}