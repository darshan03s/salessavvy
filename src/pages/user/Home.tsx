import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()

  useEffect(() => {
    if (user && user.role === "CUSTOMER") {
      navigate("/products/category/Shirts")
    } else {
      navigate("/admin")
    }
  }, [navigate])

  return (
    <div className="home-page">
      <section className="products-list-container max-w-6xl mx-auto px-2 lg:px-0">
      </section>
    </div>
  );
};

export default Home;