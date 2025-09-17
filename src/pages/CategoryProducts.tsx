import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import ProductsList from "@/components/product/ProductsList"
import { useUserContext } from "@/context/UserContext"

const CategoryProducts = () => {
    const { categoryName } = useParams()
    const categoryProductsUrl = import.meta.env.VITE_API_URL + `/api/products?category=${categoryName}`
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const { user } = useUserContext()

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
            return
        }
        axios.get(categoryProductsUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
            .then(response => {
                setProducts(response.data.products);
                console.log('Fetched category products:', response.data.products);
            })
            .catch(error => {
                console.error('Error fetching category products:', error);

                if (error.response && error.response.status === 401) {
                    navigate("/auth/login");
                    return
                }
            });
    }, [categoryName, categoryProductsUrl, navigate, user])

    return (
        <div className="category-products-page p-1">
            {
                products ?
                    <>
                        <h1 className="text-lg font-bold">
                            Products in {categoryName}
                        </h1>

                        <ProductsList products={products} />
                    </> : null
            }
        </div>
    )
}

export default CategoryProducts
