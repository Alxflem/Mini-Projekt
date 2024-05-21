import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';  // Adjust the import path as necessary
import '../styling/ProductsPage.css';
import Header from '../components/Header';
import { CartItem } from '../components/Header';
import SearchBar from '../components/SearchBar';

// Define interface for product
interface Product {
  p_id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>('alphabetical');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://127.0.0.1:5000/api/products');
      console.log('API response:', response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (name: string, price: number, imageUrl: string) => {
    const newItem: CartItem = {
      id: cartItems.length + 1,
      name,
      quantity: 1,
      imageUrl,
      price,
    };

    console.log(newItem);
    setCartItems(prevCartItems => [...prevCartItems, newItem]);
    cartItems.forEach(newItem => {
      console.log("Added: " + newItem.name);
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortType(sortValue);
    const sortedFilteredProducts = sortProducts(sortValue, filteredProducts);
    setFilteredProducts(sortedFilteredProducts);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setSelectedCategory(filter);
    if (filter) {
      const filtered = products.filter((product) => product.category === filter);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="products-list-page">
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <h1 className="page-title">Products List</h1>
      <div className="search-bar"><SearchBar onSearch={handleSearch} /></div>
      <div className="products-container">
        <div className="sort-options">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortType} onChange={handleSortChange}>
            <option value="alphabetical">Alphabetical</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="sort-options">
          <label htmlFor="filter">Filter by: </label>
          <select id="filter" onChange={handleFilterChange}>
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
              key={product.p_id}
              id={product.p_id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
