import { useMutation } from "@tanstack/react-query"
import { productActions } from ".."

export const useProductMutation = () => {
  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      // create an alert that says "Product created"
      alert("Well done!\nProduct created")
    },
  })

  return productMutation
}
