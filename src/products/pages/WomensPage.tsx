import { ProductList, useProducts } from ".."

export const WomensPage = () => {
  const { isLoading, products } = useProducts({
    filterKey: "women's clothing",
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      <p className="text-gray-500 mb-5">
        {isLoading ? "Cargando..." : `Hay ${products.length} productos`}
      </p>
      <ProductList products={products} />
    </div>
  )
}
