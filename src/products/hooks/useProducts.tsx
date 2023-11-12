import { useQuery } from "@tanstack/react-query"
import { productActions } from ".."

interface Options {
  filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", { filterKey }], // { filterKey } is the same as { filterKey: filterKey
    queryFn: () => productActions.getProducts({ filterKey }),
  })

  return {
    products,
    isLoading,
  }
}
