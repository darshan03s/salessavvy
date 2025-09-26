import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCartContext } from "@/context/CartContext"
import type { ProductType } from "@/types"
import axios from "axios"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const Product = () => {
  const { productId } = useParams()
  const cartApiUrl = import.meta.env.VITE_API_URL + "/api/cart"
  const [product, setProduct] = useState<ProductType | null>(null)
  const { addToCart } = useCartContext()
  const navigate = useNavigate()

  useEffect(() => {
    const productApiUrl = import.meta.env.VITE_API_URL + "/api/products"
    try {
      axios.get(productApiUrl + `/${productId}`, {
        withCredentials: true
      }).then(res => {
        setProduct(res.data.product)
      }).catch(err => {
        toast.error("Unable to get product")
        navigate("/")
        console.error(err)
      })
    } catch (err) {
      toast.error("Unable to get product")
      navigate("/")
      console.error(err)
    }

  }, [productId])

  return (
    <div className="max-w-6xl mx-auto py-2 px-4 lg:px-0 grid grid-cols-2 gap-4">
      <section className="product-images col-span-2 md:col-span-1">
        <Carousel className="">
          <CarouselContent>
            <CarouselItem key={product?.product_id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={product?.images[0]} alt={product?.name} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </section>

      <section className="product-details lg:px-16 col-span-2 md:col-span-1 space-y-2">
        <h1 className="text-2xl font-bold text-center">{product?.name}</h1>
        <p className="text-lg text-muted-foreground">{product?.description}</p>
        <p className="text-lg font-bold my-4">Price: &#8377; {product?.price}</p>
        <p className="text-lg font-bold my-4">Stock: {product?.stock}</p>

        <Button
          onClick={() => {
            addToCart(product!.product_id, cartApiUrl)
          }}
          className="w-full">
          <ShoppingCart />
          Add to Cart
        </Button>
      </section>
    </div>
  )
}

export default Product
