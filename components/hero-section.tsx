import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-16 sm:py-32 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] -z-10 rounded-full" />

            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                New: Checkout our latest collection
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Crafting the <span className="text-primary italic">Future</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-lg sm:text-xl leading-relaxed text-foreground/80 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                Discover a carefully curated collection of premium products designed for modern creators. Build something incredible with our state-of-the-art platform.
            </p>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
                <Link href="/products" className="w-full sm:w-auto">
                    <Button size="lg" className="h-14 w-full sm:px-8 text-lg font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
                        Get Started Now
                    </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="h-14 w-full sm:px-8 text-lg font-bold rounded-xl border-2 hover:bg-muted transition-colors">
                        Explore Collection
                    </Button>
                </Link>
            </div>
        </section>
    )
}
