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
    description: "<p>Experience unparalleled audio quality with our <strong>Premium Headphones</strong>, featuring advanced wireless technology and superior noise cancellation. These headphones deliver crystal-clear sound with deep bass and crisp highs, making them perfect for music lovers, gamers, and professionals alike.</p><p><strong>Key Features:</strong></p><ul><li>Active Noise Cancellation (ANC) technology</li><li>Up to 30 hours of battery life</li><li>Premium 40mm drivers for rich sound</li><li>Comfortable over-ear design with memory foam</li><li>Bluetooth 5.0 for stable connection</li><li>Built-in microphone for calls</li></ul><p>Whether you're commuting, working out, or relaxing at home, these headphones provide an immersive audio experience that elevates your listening pleasure.</p>",
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
    description: "<p>Stay connected and track your health with our sleek <strong>Smart Watch</strong>, designed for modern lifestyles. This intelligent wearable combines style with functionality, offering comprehensive fitness tracking, notifications, and seamless integration with your smartphone.</p><p><strong>Health & Fitness Features:</strong></p><ul><li>Heart rate monitoring 24/7</li><li>GPS tracking for accurate workout data</li><li>Step counter and calorie tracking</li><li>Sleep analysis and quality monitoring</li><li>Multiple sport modes (running, cycling, swimming)</li><li>Water-resistant up to 50 meters</li></ul><p><strong>Smart Features:</strong></p><ul><li>Receive calls, texts, and app notifications</li><li>Voice assistant integration</li><li>Customizable watch faces</li><li>Music control from your wrist</li><li>Find your phone feature</li></ul><p>With a vibrant AMOLED display and long battery life, this smartwatch is your perfect companion for staying active and connected throughout the day.</p>",
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
    description: "<p>Enhance your productivity with our <strong>Ergonomic Wireless Mouse</strong>, engineered for comfort and precision. This wireless mouse offers seamless connectivity and advanced features that make computing effortless and enjoyable.</p><p><strong>Design & Comfort:</strong></p><ul><li>Ergonomic shape designed for right-handed users</li><li>Soft-touch coating for comfortable grip</li><li>Adjustable DPI settings (800/1200/1600/2400)</li><li>Quiet click buttons to reduce noise</li><li>Compact size perfect for travel</li></ul><p><strong>Performance Features:</strong></p><ul><li>2.4GHz wireless technology for lag-free performance</li><li>Long battery life up to 12 months</li><li>Precision optical sensor</li><li>Plug-and-play setup</li><li>Compatible with Windows, macOS, and Linux</li></ul><p>Whether you're working from home, in the office, or on the go, this wireless mouse provides the reliability and comfort you need for all-day use.</p>",
    tags: ["Ergonomic", "Wireless", "Long Battery"]
  }
]