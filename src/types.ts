export type ProductType = {
    product_id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category_name: string;
};

export type CartItemType = {
    product_id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    quantity: number;
};
