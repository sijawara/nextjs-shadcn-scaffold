"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { IconShoppingCart, IconArrowRight } from "@tabler/icons-react"

interface ProductCardProps {
  id: string
  image: string
  title: string
  price: number
}

export function ProductCard({
  id,
  image,
  title,
  price,
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      name: title,
      price,
      image,
    })
  }

  return (
    <Link href={`/products/${id}`} className="group block">
      <Card className="overflow-hidden border-border/50 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-3xl cursor-pointer p-0">
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/3] relative overflow-hidden bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
              <div className="bg-background/90 text-foreground px-4 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-semibold text-sm flex items-center gap-2 shadow-xl">
                Quick View <IconArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </CardTitle>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-foreground">
                  Rp {price.toLocaleString('id-ID')}
                </span>
              </div>
              <span className="text-xs text-muted-foreground/50 line-through">
                Rp {((price || 0) * 1.2).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full h-12 rounded-2xl font-bold gap-2 text-md shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
          >
            <IconShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}