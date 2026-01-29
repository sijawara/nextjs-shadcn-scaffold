import { products } from "@/data/products"
import { ProductsClient } from "./client"

export default function ProductsPage() {
    return <ProductsClient initialProducts={products} />
}
