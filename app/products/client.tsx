"use client"

import { useState, useMemo } from "react"
import { Product } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { IconFilter, IconSearch, IconAdjustmentsHorizontal, IconX } from "@tabler/icons-react"

interface ProductsClientProps {
    initialProducts: Product[]
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
    const [search, setSearch] = useState("")
    const [priceRange, setPriceRange] = useState([0, 10000000])
    const [committedPriceRange, setCommittedPriceRange] = useState([0, 10000000])
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        initialProducts.forEach(product => {
            product.tags?.forEach(tag => tags.add(tag))
        })
        return Array.from(tags)
    }, [initialProducts])

    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
            const matchesPrice = product.price >= committedPriceRange[0] && product.price <= committedPriceRange[1]
            const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => product.tags?.includes(tag))
            return matchesSearch && matchesPrice && matchesTags
        })
    }, [initialProducts, search, committedPriceRange, selectedTags])

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    const resetFilters = () => {
        setSearch("")
        setPriceRange([0, 10000000])
        setCommittedPriceRange([0, 10000000])
        setSelectedTags([])
    }

    const filterContent = useMemo(() => (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Cari Produk</h3>
                <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 bg-muted/30 border-border/50"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Range Harga</h3>
                <div className="px-2">
                    <Slider
                        defaultValue={[0, 10000000]}
                        max={10000000}
                        step={100000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        onValueCommit={setCommittedPriceRange}
                        className="mb-4"
                    />
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Rp {priceRange[0].toLocaleString('id-ID')}</span>
                        <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer px-3 py-1 transition-all rounded-lg"
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground gap-2"
                onClick={resetFilters}
            >
                <IconX className="h-4 w-4" /> Reset Semua Filter
            </Button>
        </div>
    ), [search, priceRange, selectedTags, allTags])

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/30">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-grid-small opacity-30 -z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 py-16">
                <header className="mb-12">
                    <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                        Explore Collection
                    </Badge>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                Semua <span className="text-primary italic">Produk</span>
                            </h1>
                            <p className="text-muted-foreground mt-2 max-w-md font-medium">
                                Temukan koleksi premium kami yang dirancang untuk performa dan gaya hidup modern.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="md:hidden gap-2 border-border/50 bg-card/50 backdrop-blur-xl rounded-xl">
                                        <IconFilter className="h-4 w-4" /> Filter
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <SheetHeader>
                                        <SheetTitle>Filter Produk</SheetTitle>
                                        <SheetDescription>
                                            Sesuaikan pencarian produk Anda.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="py-8">
                                        {filterContent}
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <div className="text-sm text-muted-foreground font-medium">
                                Menampilkan <span className="text-foreground font-bold">{filteredProducts.length}</span> produk
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                    {/* Desktop Filter Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-8 bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <IconAdjustmentsHorizontal className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-bold">Filter</h2>
                            </div>
                            {filterContent}
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main>
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        id={product.id}
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center bg-card/30 backdrop-blur-xl rounded-3xl border border-dashed border-border/50">
                                <div className="p-4 rounded-full bg-muted mb-6">
                                    <IconSearch className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Tidak ada produk ditemukan</h3>
                                <p className="text-muted-foreground max-w-sm mb-8">
                                    Kami tidak bisa menemukan produk yang cocok dengan filter pencarian Anda. Silakan coba filter lain.
                                </p>
                                <Button onClick={resetFilters} variant="outline" className="rounded-xl border-2">
                                    Reset Semua Filter
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
