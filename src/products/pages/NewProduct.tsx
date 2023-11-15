import { Button, Image, Input, Textarea } from "@nextui-org/react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useProductMutation } from ".."

interface FormInputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const productMutation = useProductMutation()

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Keyboard",
      price: 150.22,
      description:
        "Brooklyn slow-carb cloud bread selfies pork belly asymmetrical hell of migas VHS offal fingerstache messenger bag unicorn photo booth. Cliche raclette kinfolk twee marfa meh occupy street art austin.",
      category: "men's clothing",
      image:
        "https://www.positivegrid.com/cdn/shop/files/SparkGo111.jpg?v=1683531206",
    },
  })

  const newImage = watch("image")

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    productMutation.mutate(data)
  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                  value={field.value?.toString()}
                  // +ev.target.value is for converting string to number
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              )}
            />
            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="url"
                  label="Imagen del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  className="mt-2"
                  label="Descripcion del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />
            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Creating..." : "Create product"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage} width={600} height={600} />
          </div>
        </div>
      </form>
    </div>
  )
}
