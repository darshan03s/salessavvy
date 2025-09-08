import { Link, useLocation, useParams } from "react-router-dom";

const CategoriesHeader = () => {
    const categories = ["Shirts", "Pants", "Phones"];

    const { categoryName } = useParams();

    const location = useLocation();

    if (location.pathname === '/auth/login' || location.pathname === '/auth/register' || location.pathname === '/cart' || location.pathname.includes('/product/') || location.pathname === '/orders') {
        return null;
    }

    return (
        <section className="w-full bg-primary text-primary-foreground flex items-center gap-6 overflow-auto justify-around h-10 text-xs px-2 md:text-lg">
            {categories.map((category, index) => {
                return (
                    <Link key={index} to={`/products/category/${category}`} className={`hover:underline flex items-center gap-2 ${categoryName === category ? 'underline' : ''}`} >
                        {category}
                    </Link>
                )
            })}
        </section>
    )
}

export default CategoriesHeader
