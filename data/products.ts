export interface Product {
  id: string
  image: string
  gallery?: string[]
  title: string
  price: number
  description: string
  badge?: string
  tags?: string[]
}

export const products: Product[] = [
  {
    id: "headphones-1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=600&h=600&fit=crop"
    ],
    title: "Premium Headphones",
    price: 4500000,
    description: "High-quality wireless headphones with noise cancellation and premium sound.",
    tags: ["Wireless", "Noise Cancelling", "Premium"]
  },
  {
    id: "watch-1",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=600&fit=crop"
    ],
    title: "Smart Watch",
    price: 3000000,
    description: "Stay connected with this sleek smartwatch featuring health tracking and notifications.",
    tags: ["Fitness", "GPS", "Heart Rate"]
  },
  {
    id: "mouse-1",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop"
    ],
    title: "Wireless Mouse",
    price: 750000,
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
    tags: ["Ergonomic", "Wireless", "Long Battery"]
  }
]