import { ProductList, useProducts } from ".."

export const ElectronicsPage = () => {
  const { isLoading, products } = useProducts({
    filterKey: "electronics",
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos electrónicos</h1>

      <p className="text-gray-500 mb-5">
        {isLoading ? "Cargando..." : `Hay ${products.length} productos`}
      </p>

      <ProductList products={products} />
    </div>
  )
}
