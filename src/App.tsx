import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryProducts from "./pages/CategoryProducts";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { useEffect } from "react";
import axios from "axios";
import { useCartContext } from "./context/CartContext";
import { useUserContext } from "./context/UserContext";
import Loading from "./components/Loading";

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const { getCartItemsCount } = useCartContext()
  const navigate = useNavigate()
  const { user, fetchingUser, setUser, setFetchingUser } = useUserContext()

  useEffect(() => {
    axios.get(apiUrl + "/api/auth/verify", {
      withCredentials: true
    }).then(res => {
      setUser({
        username: res.data.username,
        role: res.data.role
      })

      setFetchingUser(false)
    }).catch(error => {
      // Handle 401 or any other error
      if (error.response?.status === 401) {
        navigate("/auth/login");
      }
      setFetchingUser(false)
    })
  }, [])

  useEffect(() => {
    if (!user && !fetchingUser) {
      navigate("/auth/login");
      return
    }
    getCartItemsCount()
  }, [user, fetchingUser])

  if (fetchingUser) {
    return <Loading />
  }

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
