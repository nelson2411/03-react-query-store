import axios from "axios"

const productsApi = axios.create({
  baseURL: "http://localhost:3000",
})

export { productsApi }
