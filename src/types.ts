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
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    quantity: number;
};

export type UserType = {
    role: string;
    username: string;
};
