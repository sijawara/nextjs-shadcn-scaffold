"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  image: string
  title: string
  price: number
  badge?: string
  tags?: string[]
}

import { useRef, useState, useEffect } from "react"
import { IconShoppingCart, IconArrowRight, IconChevronRight } from "@tabler/icons-react"

export function ProductCard({
  id,
  image,
  title,
  price,
  badge,
  tags,
}: ProductCardProps) {
  const { addItem } = useCart()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showChevron, setShowChevron] = useState(false)

  const checkOverflow = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowChevron(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [tags])

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
          {badge && (
            <div className="absolute top-4 left-4 z-10 shrink-0">
              <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 shadow-lg border-none">
                {badge}
              </Badge>
            </div>
          )}
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
                Rp {(price * 1.2).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div
              className="relative mt-4 group/tags"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <div
                ref={scrollRef}
                onScroll={checkOverflow}
                className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
              >
                {tags.map((tag, index) => (
                  <span key={index} className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
              {showChevron && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent flex items-center justify-end pointer-events-none">
                  <IconChevronRight className="h-3 w-3 text-muted-foreground animate-pulse" />
                </div>
              )}
            </div>
          )}
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