import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product, productActions } from ".."

export const useProductMutation = () => {
  const QueryClient = useQueryClient()

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (data) => {
      console.log("onMutate", data)

      const optimisticProduct = { id: Math.random(), ...data }

      // store the optimistic value for the product in the cache
      QueryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => (old ? [...old, optimisticProduct] : [])
      )

      return {
        optimisticProduct,
      }
    },
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data, variables, context)

      // QueryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // })

      QueryClient.removeQueries({
        queryKey: ["products", context?.optimisticProduct.id],
      })

      QueryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) =>
          old
            ? [
                ...old,
                {
                  ...data,
                  id: old.length + 1,
                },
              ]
            : []
      )
    },

    onError: (error, variables, context) => {
      QueryClient.removeQueries({
        queryKey: ["products", context?.optimisticProduct.id],
      })

      QueryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (old) =>
          old ? old.filter((p) => p.id !== context?.optimisticProduct.id) : []
      )
    },
  })

  return productMutation
}
