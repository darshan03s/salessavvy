import ProductsList from "@/components/product/ProductsList";

const Home = () => {
  return (
    <div className="home-page">
      <section className="products-list-container max-w-6xl mx-auto px-2 lg:px-0">
        <ProductsList />
      </section>
    </div>
  );
};

export default Home;