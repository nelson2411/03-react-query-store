import { productsApi } from ".."
import { type Product } from "../interfaces/product"

interface GetProductsOptions {
  filterKey?: string
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const { data } = await productsApi.get<Product[]>(`/products`)
  return data
}
