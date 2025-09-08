import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryProducts from "./pages/CategoryProducts";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div className="bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/category/all" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/products/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
