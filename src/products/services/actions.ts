import { productsApi } from ".."
import { type Product } from "../interfaces/product"

interface GetProductsOptions {
  filterKey?: string
}

const sleep = (seconds: number = 2): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  await sleep(1)

  const filterUrl = filterKey ? `?category=${filterKey}` : ""

  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`)
  return data
}

export const getProductById = async (id: number): Promise<Product> => {
  await sleep(1)

  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}

export interface ProductLike {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const createProduct = async (product: ProductLike) => {
  await sleep(1)

  const { data } = await productsApi.post<Product>("/products", product)
  return data
}
