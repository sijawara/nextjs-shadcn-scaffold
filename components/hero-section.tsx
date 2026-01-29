import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-24 sm:py-32 text-center relative">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-8">
                New: Checkout our latest collection
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                Crafting the <span className="text-primary italic">Future</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-foreground/80 max-w-2xl mx-auto font-medium">
                Discover a carefully curated collection of premium products designed for modern creators. Build something incredible with our state-of-the-art platform.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
                <Link href="/products">
                    <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">Get Started Now</Button>
                </Link>
                <Link href="/products">
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-xl border-2 hover:bg-muted transition-colors">Explore Collection</Button>
                </Link>
            </div>
        </section>
    )
}
