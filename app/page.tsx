"use client"

import { IconBolt, IconPointer, IconShieldCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-small opacity-100 dark:opacity-40 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 sm:py-32 text-center relative">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
          New: Checkout our latest collection
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
          Crafting the <span className="text-primary italic">Future</span>
        </h1>
        <p className="mt-8 text-xl leading-8 text-foreground/80 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          Discover a carefully curated collection of premium products designed for modern creators. Build something incredible with our state-of-the-art platform.
        </p>
        <div className="mt-12 flex items-center justify-center gap-x-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">Get Started Now</Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-xl border-2">Explore Features</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 sm:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />

        <div className="text-center mb-20 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Core Capabilities</h2>
          <h3 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Engineered for <span className="text-primary italic">Excellence</span>
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-foreground/70 leading-relaxed font-medium">
            We've combined speed, security, and simplicity into a single cohesive experience designed for elite performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Full Velocity",
              desc: "Engineered with the latest tech stack for near-instant responses and unparalleled performance.",
              icon: <IconBolt className="h-8 w-8 text-primary" />,
              badge: "Speed"
            },
            {
              title: "Seamless UX",
              desc: "An intuitive interface designed by experts to feel natural and effortless from the very first click.",
              icon: <IconPointer className="h-8 w-8 text-indigo-500" />,
              badge: "Intuitive"
            },
            {
              title: "Vault Security",
              desc: "Rest easy knowing your data is protected by enterprise-grade encryption and security protocols.",
              icon: <IconShieldCheck className="h-8 w-8 text-emerald-500" />,
              badge: "Secure"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-in fade-in slide-in-from-bottom-8 duration-1000"
              style={{ animationDelay: `${400 + (i * 100)}ms`, animationFillMode: 'both' }}
            >
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors duration-500">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h4>
              <p className="text-foreground/70 leading-relaxed mb-6 font-medium">{feature.desc}</p>
              <Badge variant="secondary" className="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider bg-muted text-muted-foreground border-none">
                {feature.badge}
              </Badge>

              {/* Decorative corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Curated Selection</h2>
          <h3 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Featured <span className="text-primary italic">Collections</span>
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-foreground/70 leading-relaxed font-medium">
            Discover our hand-picked selection of premium items, each chosen for their exceptional quality and timeless design.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  )
}
