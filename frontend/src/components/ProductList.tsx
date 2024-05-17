import './ProductsList.css';

const ProductList = () => {
  //example product images (URLs can be replaced with actual product images)
  const productImages = [
    'https://www.elgiganten.se/image/dv_web_D1800010021369161/525855/dji-osmo-action-3-actionkamera-standard-combo--pdp_main-640.jpg',
    'https://www.elgiganten.se/image/dv_web_D1800010021823789/764589/hp-laptop-i38128-156-barbar-dator--pdp_main-640.jpg',
    'https://www.elgiganten.se/image/dv_web_D180001002981963/421041/acer-aspire-xc-840-cel8256-stationar-dator--pdp_main-640.jpg',
    'https://www.elgiganten.se/image/dv_web_D180001002857550/361910/ipad-102-2021-64-gb-wifi-space-gray--pdp_main-640.jpg',
    'https://www.elgiganten.se/image/dv_web_D1800010021602702/600844/tp-link-archer-ax1800-router--pdp_main-640.jpg'
  ];

  return (
    <div className="product-list">
      <section className="product-row">
    <div className="product-card">
      <img src="https://www.elgiganten.se/image/dv_web_D1800010021271907/LTMK545/logitech-mk545-tangentbord-och-mus--pdp_main-640.jpg" alt="Product 1"/>
      <h3 className="product-title">Product Title</h3>
      <p className="product-price">$49.99</p>
    </div>
    <div className="product-card">
      <img src="https://www.elgiganten.se/image/dv_web_D1800010021823789/764589/hp-laptop-i38128-156-barbar-dator--pdp_main-640.jpg" alt="Product 2"/>
      <h3 className="product-title">Product Title</h3>
      <p className="product-price">$29.99</p>
    </div>
    <div className="product-card">
      <img src="https://www.elgiganten.se/image/dv_web_D180001002981963/421041/acer-aspire-xc-840-cel8256-stationar-dator--pdp_main-640.jpg" alt="Product 3"/>
      <h3 className="product-title">Product Title</h3>
      <p className="product-price">$79.99</p>
    </div>
    <div className="product-card">
      <img src="https://www.elgiganten.se/image/dv_web_D180001002857550/361910/ipad-102-2021-64-gb-wifi-space-gray--pdp_main-640.jpg" alt="Product 4"/>
      <h3 className="product-title">Product Title</h3>
      <p className="product-price">$19.99</p>
    </div>
    <div className="product-card">
      <img src="https://www.elgiganten.se/image/dv_web_D1800010021602702/600844/tp-link-archer-ax1800-router--pdp_main-640.jpg" alt="Product 5"/>
      <h3 className="product-title">Product Title</h3>
      <p className="product-price">$39.99</p>
    </div>
  </section>
    </div>
  );
};

export default ProductList;
