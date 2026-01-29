import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

export function ProductsSection() {
    return (
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
    )
}
