export type ProductType = {
    product_id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
};

export type CartItemType = {
    product_id: number;
    image_url: string;
    name: string;
    description: string;
    price_per_unit: number;
    quantity: number;
    stock: number;
};

export type UserType = {
    role: string;
    username: string;
};

export type CartResponseProductsType = {
    product_id: number;
    image_url: string;
    name: string;
    description: string;
    price_per_unit: number;
    quantity: number;
    total_price: number;
};

export type CartResponseType = {
    products: CartResponseProductsType[];
    overall_total_price: number;
};

export type OrderType = {
    description: string;
    image_url: string;
    name: string;
    order_id: string;
    price_per_unit: string;
    product_id: number;
    quantity: number;
    total_price: number;
};
