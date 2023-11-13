import { useQuery } from "@tanstack/react-query"
import { productActions } from ".."

interface Options {
  id: number
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => productActions.getProductById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return { product, isLoading, isError, isFetching }
}
