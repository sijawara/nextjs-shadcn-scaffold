import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import { ProductDetailClient } from './client'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = products.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}