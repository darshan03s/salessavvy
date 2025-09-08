import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { product } from "@/data"
import { ShoppingCart } from "lucide-react"

const Product = () => {
  return (
    <div className="max-w-6xl mx-auto py-2 px-4 lg:px-0 grid grid-cols-2 gap-4">
      <section className="product-images col-span-2 md:col-span-1">
        <Carousel className="">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </section>

      <section className="product-details lg:px-16 col-span-2 md:col-span-1 space-y-2">
        <h1 className="text-2xl font-bold text-center">{product.name}</h1>
        <p className="text-lg text-muted-foreground">{product.description}</p>
        <p className="text-lg font-bold my-4">Price: ${product.price}</p>

        <Button className="w-full">
          <ShoppingCart />
          Add to Cart
        </Button>
      </section>
    </div>
  )
}

export default Product
