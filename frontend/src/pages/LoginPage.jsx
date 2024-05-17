import Header from '../components/Header';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <section className="hero">
        <div className="container">
          <h1>Nerdstore</h1>
          <p>Description.</p>
        </div>
      </section>
      <div className="product-list">
        {/*replace with actual images or products later...*/}
        <img src="https://via.placeholder.com/150" alt="Product 1" />
        <img src="https://via.placeholder.com/150" alt="Product 2" />
        <img src="https://via.placeholder.com/150" alt="Product 3" />
      </div>
    </div>
  );
};

export default LandingPage;