"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IconArrowLeft, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { products } from '@/data/products'
import { useCartStore } from '@/lib/cart-context'
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
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-foreground/70" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2 text-muted-foreground/50">
              <IconChevronRight className="h-4 w-4" />
              <Link href="/products" className="hover:text-primary transition-colors text-foreground/70 font-medium">Products</Link>
            </li>
            <li className="flex items-center space-x-2 text-muted-foreground/50">
              <IconChevronRight className="h-4 w-4" />
              <span className="text-foreground font-semibold truncate max-w-[150px] sm:max-w-none">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-sm border">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Float Navigation */}
              {galleryImages.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full shadow-lg"
                    onClick={prevImage}
                  >
                    <IconChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full shadow-lg"
                    onClick={nextImage}
                  >
                    <IconChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}

              {product.badge && (
                <Badge className="absolute top-4 left-4 px-3 py-1 text-sm font-semibold shadow-md">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${index === currentImageIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-transparent hover:border-muted-foreground/30'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumb ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {/* Mock original price for UI feel */}
                  <span className="text-lg text-muted-foreground line-through opacity-70">
                    Rp {(product.price * 1.2).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Tags/Features */}
              {product.tags && product.tags.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Properties</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 bg-muted/30 border-border">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Descriptions - High level */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">About this product</h3>
                <div
                  className="text-foreground/90 leading-relaxed line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: product.description.split('</p>')[0] + '</p>' }}
                />
                <Link href="#description" className="text-primary font-semibold hover:underline text-sm inline-block">
                  Read more details
                </Link>
              </div>

              {/* Actions */}
              <div className="hidden lg:flex flex-col gap-4 pt-6 border-t">
                <Button
                  size="lg"
                  className="h-14 text-lg font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => addItem({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.image,
                  })}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 text-lg font-bold rounded-xl border-2 hover:bg-muted"
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
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description Section */}
        <section id="description" className="mt-20 pt-20 border-t">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Detailed Description</h2>
            <div
              className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 leading-loose text-lg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 p-4 bg-background/80 backdrop-blur-lg border-t z-40 flex gap-3 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
        <Button
          className="flex-1 h-12 font-bold rounded-xl shadow-md"
          onClick={() => addItem({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
          })}
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-12 font-bold rounded-xl border-2"
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
          Buy Now
        </Button>
      </div>
    </div>
  )
}