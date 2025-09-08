import { product } from "@/data"
import ProductCard from "./ProductCard"

const ProductsList = () => {

    return (
        <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3">
            {[...Array(10)].map((_, index) => {
                return <ProductCard key={index} product={product} />
            })}
        </div>
    )
}

export default ProductsList
