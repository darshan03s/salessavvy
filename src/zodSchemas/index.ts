import z from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.number().min(1, "Price must be a positive number"),
    stock: z.number().min(1, "Stock must be a positive number"),
    category: z.string().min(1, "Please select a category"),
    image: z.string("Please add a image url"),
});

export const updateUserSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    email: z.email("Enter a valid email address"),
    role: z.enum(["ADMIN", "CUSTOMER"]),
});

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long")
        .regex(/[A-Z]/, "Add at least one uppercase letter")
        .regex(/[a-z]/, "Add at least one lowercase letter")
        .regex(/[0-9]/, "Add at least one number"),
});

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    email: z.email("Enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long")
        .regex(/[A-Z]/, "Add at least one uppercase letter")
        .regex(/[a-z]/, "Add at least one lowercase letter")
        .regex(/[0-9]/, "Add at least one number"),
    role: z.enum(["ADMIN", "CUSTOMER"]),
});
