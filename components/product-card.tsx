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
  description: string
  badge?: string
  tags?: string[]
}

export function ProductCard({
  id,
  image,
  title,
  price,
  description,
  badge,
  tags,
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id,
      name: title,
      price,
      image,
    })
  }

  return (
    <Link href={`/products/${id}`} className="block">
      <Card className="w-full max-w-sm hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="relative">
          {badge && (
            <Badge className="absolute top-2 left-2 z-10">
              {badge}
            </Badge>
          )}
          <div className="aspect-square relative overflow-hidden rounded-t-[12px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            Rp {price.toLocaleString('id-ID')}
          </span>
          <Button onClick={handleAddToCart} size="sm">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}