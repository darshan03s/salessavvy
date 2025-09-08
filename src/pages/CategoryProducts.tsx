import { useParams } from "react-router-dom"

const CategoryProducts = () => {
    const { categoryName } = useParams()
    return (
        <div className="category-products-page p-1">
            <h1 className="text-lg font-bold">
                Products in {categoryName}
            </h1>
        </div>
    )
}

export default CategoryProducts
