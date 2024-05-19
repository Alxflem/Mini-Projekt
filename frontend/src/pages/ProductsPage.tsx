import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styling/ProductsPage.css';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 30, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021271907/LTMK545/logitech-mk545-tangentbord-och-mus--pdp_main-640.jpg', category: 'Electronics'},
  { id: 2, name: 'Product 2', price: 20, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021823789/764589/hp-laptop-i38128-156-barbar-dator--pdp_main-640.jpg', category: 'Kitchen' },
  { id: 3, name: 'Product 3', price: 50, imageUrl: 'https://www.elgiganten.se/image/dv_web_D180001002981963/421041/acer-aspire-xc-840-cel8256-stationar-dator--pdp_main-640.jpg', category: 'Electronics' },
  { id: 4, name: 'Product 4', price: 40, imageUrl: 'https://www.elgiganten.se/image/dv_web_D180001002857550/361910/ipad-102-2021-64-gb-wifi-space-gray--pdp_main-640.jpg', category: 'Office' },
  { id: 5, name: 'Product 5', price: 25, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021602702/600844/tp-link-archer-ax1800-router--pdp_main-640.jpg', category: 'Office' },
  { id: 6, name: 'Product 6', price: 32, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021478395/617386/asus-go-e410-celeron464-14-barbar-dator--pdp_main-640.jpg', category: 'Office' },
  { id: 7, name: 'Product 7', price: 62, imageUrl: 'https://www.elgiganten.se/image/dv_web_D180001279653853/617388/asus-vivobook-go-15-athlon8128-156-barbar-dator--pdp_main-640.jpg', category: 'Office' },
  { id: 8, name: 'Product 8', price: 12, imageUrl: 'https://www.elgiganten.se/image/dv_web_D1800010021474829/616620/lenovo-ideapad-slim-3-r516512-14-barbar-dator-arctic-grey--pdp_main-640.jpg', category: 'Office' },

  //we should change this so that it's products from the database
];

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [sortType, setSortType] = useState<string>('alphabetical');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortType(sortValue);
    const sortedFilteredProducts = sortProducts(sortValue, [...filteredProducts]); 
    setFilteredProducts(sortedFilteredProducts);
  };

  const handleFilterChange = (filter: string) => {
    const filtered = products.filter((product) => product.category === filter);
    //if no filter is selected, show all products
    if (!filter) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(filtered);
  };

  const sortProducts = (type: string, productsToSort: Product[]) => {
    let sortedProducts = [...productsToSort];
    if (type === 'alphabetical') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'price-low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'price-high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  const handleTitleClick = () => {
    navigate('/landing');
  };


  return (
    <div className="products-list-page">
      <h1 className="store-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>NerdStore</h1>
      <h1 className='page-title'>Products List</h1>

      <div className='products-container'>
      <div className="sort-options">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortType} onChange={handleSortChange}>
          <option value="alphabetical">Alphabetical</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      <div className='sort-options'>
      <label htmlFor='filter'>Filter by: </label>
        <select onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Electronics">Electronics</option>
          <option value="Office">Office</option>
        </select>
    </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default ProductsPage;
