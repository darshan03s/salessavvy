const ProductImage = ({ src, alt }: { src: string, alt: string }) => {
    return (
        <div className="product-image rounded-md rounded-b-none w-full h-[20rem] overflow-hidden">
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain p-4 rounded-md rounded-b-none"
            />
        </div>
    )
}

export default ProductImage
