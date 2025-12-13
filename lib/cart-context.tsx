import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            toast.success(`Increased ${item.name} quantity in cart`)
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          toast.success(`${item.name} added to cart`)
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          }
        }),
      removeItem: (id) =>
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id)
          if (itemToRemove) {
            toast.success(`${itemToRemove.name} removed from cart`)
          }
          return {
            items: state.items.filter((item) => item.id !== id),
          }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((item) => item.id === id)
          if (quantity <= 0) {
            if (item) {
              toast.success(`${item.name} removed from cart`)
            }
            return {
              items: state.items.filter((item) => item.id !== id),
            }
          }
          if (item && quantity !== item.quantity) {
            const action = quantity > item.quantity ? 'increased' : 'decreased'
            toast.success(`${item.name} quantity ${action} to ${quantity}`)
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }
        }),
      clearCart: () => {
        toast.success('Cart cleared')
        set({ items: [] })
      },
      getTotal: () => {
        const { items } = get()
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage', // name of the item in localStorage
    }
  )
)

// For backward compatibility, export a hook that matches the old API
export const useCart = () => {
  const store = useCartStore()
  return {
    state: { items: store.items },
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  }
}