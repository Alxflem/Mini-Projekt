import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styling/ProductsPage.css';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 30, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021271907/LTMK545/logitech-mk545-tangentbord-och-mus--pdp_main-640.jpg' },
  { id: 2, name: 'Product 2', price: 20, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021823789/764589/hp-laptop-i38128-156-barbar-dator--pdp_main-640.jpg' },
  { id: 3, name: 'Product 3', price: 50, imageUrl: 'https://www.elgiganten.se/image/dv_web_D180001002981963/421041/acer-aspire-xc-840-cel8256-stationar-dator--pdp_main-640.jpg' },
  { id: 4, name: 'Product 4', price: 40, imageUrl: 'https://www.elgiganten.se/image/dv_web_D180001002857550/361910/ipad-102-2021-64-gb-wifi-space-gray--pdp_main-640.jpg' },
  { id: 5, name: 'Product 5', price: 25, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021602702/600844/tp-link-archer-ax1800-router--pdp_main-640.jpg' },
  //we should change this so that it's products from the database
];

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [sortType, setSortType] = useState<string>('alphabetical');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortType(sortValue);
    sortProducts(sortValue);
  };

  const sortProducts = (type: string) => {
    let sortedProducts = [...products];
    if (type === 'alphabetical') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'price-low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'price-high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const handleTitleClick = () => {
    navigate('/');
  };


  return (
    <div className="products-list-page">
      <h1 className="store-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>NerdStore</h1>
      <h1 className='page-title'>Products List</h1>
      <div className="sort-options">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortType} onChange={handleSortChange}>
          <option value="alphabetical">Alphabetical</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
