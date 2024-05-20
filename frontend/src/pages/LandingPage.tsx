import "../styling/LandingPage.css";
import ProductList from "../components/ProductList";
import ViewProducts from "../components/ViewProducts";
import LoginButton from "../components/LoginButton";

const LandingPage = () => {
 


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
            <ViewProducts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
