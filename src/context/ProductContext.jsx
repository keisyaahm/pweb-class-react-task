import { createContext, useContext, useEffect, useState } from 'react'
import { initialProducts } from '../data/products.js'

const ProductContext = createContext(null)

const STORAGE_KEY = '48orineshop-products'

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const savedProducts = stored ? JSON.parse(stored) : initialProducts
      return savedProducts.map((product) => ({
        ...product,
        quantity: product.quantity ?? 0,
      }))
    } catch {
      return initialProducts
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const nextId = () => Math.max(...products.map((p) => p.id), 0) + 1

  const addProduct = ({ name, price, quantity }) => {
    setProducts((prev) => [...prev, { id: nextId(), name, price, quantity }])
  }

  const updateProduct = (id, { name, price, quantity }) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name, price, quantity } : p))
    )
  }

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) {
    throw new Error('useProducts harus dipakai di dalam ProductProvider')
  }
  return ctx
}
