"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { products } from '@/data/products'
import { useCartStore } from '@/lib/cart-context'
import { Cart } from '@/components/cart'
import { useRouter } from 'next/navigation'

export function ProductDetailClient({ product }: { product: typeof products[0] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryImages = product.gallery || [product.image]
  const { addItem, items, removeItem, updateQuantity } = useCartStore()
  const router = useRouter()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Produk
          </Link>
          <Cart
            items={items}
            onRemoveItem={removeItem}
            onUpdateQuantity={updateQuantity}
          />
        </div>
      </header>

      {/* Product Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Gambar sebelumnya"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Gambar berikutnya"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Indicators */}
            {galleryImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-primary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Ke gambar ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {product.title}
              </h1>
              {product.badge && (
                <Badge className="mt-2">{product.badge}</Badge>
              )}
            </div>

            <div className="text-3xl font-bold text-foreground">
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Fitur</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => addItem({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.image,
                })}
              >
                Tambah ke Keranjang
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.image,
                  })
                  router.push('/checkout')
                }}
              >
                Beli Sekarang
              </Button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Deskripsi Produk</h2>
          <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </main>
    </div>
  )
}