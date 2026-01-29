"use client"

import { Cart } from "@/components/cart"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCartStore } from "@/lib/cart-context"
import Link from "next/link"

interface HeaderProps {
    showCart?: boolean
}

export function Header({ showCart = true }: HeaderProps) {
    const { items, removeItem, updateQuantity } = useCartStore()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Our Platform</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/products" className="text-sm font-semibold hover:text-primary transition-colors">
                        Products
                    </Link>
                    {showCart && (
                        <Cart
                            items={items}
                            onRemoveItem={removeItem}
                            onUpdateQuantity={updateQuantity}
                        />
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
