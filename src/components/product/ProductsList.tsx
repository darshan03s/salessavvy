import ProductCard from "./ProductCard"
import type { ProductType } from "@/types"

const ProductsList = ({ products }: { products: ProductType[] }) => {

    return (
        <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3">
            {
                products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductsList
