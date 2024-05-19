import "../styling/LandingPage.css";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import ViewProducts from "../components/ViewProducts";
import LoginButton from "../components/LoginButton";


const LandingPage = () => {

  const products = [
    {
      id: 1,
      name: "Headphones",
      price: 99.99,
      imageUrl: "https://example.com/headphones.jpg",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Laptop",
      price: 799.99,
      imageUrl: "https://example.com/laptop.jpg",
      category: "Electronics",
    },
    {
      id: 3,
      name: "T-Shirt",
      price: 19.99,
      imageUrl: "https://example.com/tshirt.jpg",
      category: "Clothing",
    },
  ];

  return (
    <div className="landing-page">
      <LoginButton />
      <main className="main">
        <div className="home__container container">
          <div className="home__data">
            <span className="home__subtitle">Welcome to</span>
            <h1 className="home__title">NerdStore</h1>
            <p className="home__description">
              Your local store with nerd stuff!
            </p>
            <SearchBar />
            <ProductList />
            <ViewProducts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
