import { useQuery } from "@tanstack/react-query"
import { productActions } from ".."

interface Options {
  filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    isLoading,
    isError,
    data: products,
    isFetching,
  } = useQuery(
    ["products", { filterKey }],
    () => productActions.getProducts({ filterKey }),
    {
      staleTime: 1000 * 60 * 60, // 5 minutos
    }
  )

  return {
    isLoading,
    isError,
    products,
    isFetching,
  }
}
