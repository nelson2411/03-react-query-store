import { useEffect } from "react"
import { ProductCard, useProduct } from ".."
import { useParams } from "react-router-dom"

export const ProductById = () => {
  const { id } = useParams()
  const { product, isLoading, isError, isFetching } = useProduct({ id: +id! })

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto por ID</h1>

      <p className="text-gray-500 mb-5">
        {isLoading
          ? "Cargando..."
          : isError
          ? "Hubo un error"
          : isFetching
          ? "Actualizando..."
          : `${product?.title}`}
      </p>

      {product && <ProductCard product={product} fullDescription />}
    </div>
  )
}
