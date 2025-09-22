import { useUserContext } from "@/context/UserContext"
import ProductCard from "./ProductCard"
import type { CategoryType, ProductType } from "@/types"
import EditProductCard from "../../pages/admin/components/EditProductCard"

const ProductsList = ({ products, categories, onUpdate }: { products: ProductType[], categories?: CategoryType[], onUpdate?: () => void }) => {
    const { user } = useUserContext()

    return (
        <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3">
            {
                products.map((product) => {
                    if (user?.role === "CUSTOMER") {
                        return <ProductCard key={product.product_id} product={product} />
                    } else if (user?.role === "ADMIN") {
                        return <EditProductCard key={product.product_id} product={product} categories={categories!} onUpdate={onUpdate!} />
                    }
                })
            }
        </div>
    )
}

export default ProductsList
