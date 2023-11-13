import { useQuery } from "@tanstack/react-query"
import { productActions } from ".."

interface Options {
  filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["products", { filterKey }], // { filterKey } is the same as { filterKey: filterKey
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return {
    products,
    isLoading,
    isError,
    isFetching,
  }
}
