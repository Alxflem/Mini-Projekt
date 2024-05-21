import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
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
  type: number; // Assuming type is represented as an ID
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>('alphabetical');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number | null>(null); // Changed to number or null

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://127.0.0.1:5000/api/products');
      console.log('API response:', response.data);
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize with all products
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
    const typeId = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedType(typeId);
    console.log('Selected Type:', typeId); // Debugging log
    if (typeId !== null) {
      const filtered = products.filter((product) => product.type === typeId);
      setFilteredProducts(filtered);
      console.log('Filtered Products:', filtered); // Debugging log
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
    console.log('Search Query:', query); // Debugging log
    console.log('Filtered Products After Search:', filtered); // Debugging log
  };

  useEffect(() => {
    let updatedProducts = products;

    if (selectedType !== null) {
      updatedProducts = updatedProducts.filter(product => product.type === selectedType);
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(updatedProducts);
    console.log('Updated Products:', updatedProducts); // Debugging log
  }, [searchQuery, selectedType, products]);

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
          <label htmlFor="filter">Filter by Type: </label>
          <select id="filter" onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="1">Electronics</option>
            <option value="2">Office</option>
            <option value="3">Clothing</option>
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
