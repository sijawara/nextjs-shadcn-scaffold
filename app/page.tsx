"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Welcome to Our Platform
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Discover amazing features and build something incredible. Our platform provides everything you need to get started quickly and efficiently.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to succeed
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fast & Reliable</CardTitle>
              <CardDescription>
                Built for performance with modern technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Performance</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Intuitive interface designed for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">UX</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure</CardTitle>
              <CardDescription>
                Your data is protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Security</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Products</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover our amazing collection
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              badge={product.badge}
              tags={product.tags}
            />
          ))}
        </div>


      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Our Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
