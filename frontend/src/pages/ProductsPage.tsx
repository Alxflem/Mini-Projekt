import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styling/ProductsPage.css';
import Header from '../components/Header';
import { CartItem } from '../components/Header';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { useUser } from "../components/UserContext";

interface Product {
  p_id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>('alphabetical');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [chosenInterests, setChosenInterests] = useState<string[]>([]); // State to store chosen interests

  useEffect(() => {
    fetchProducts();
    fetchFilterOptions();
  }, []);

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
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/api/products');
      console.log('API response:', response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get<string[]>('http://localhost:5000/api/types');
      console.log('Filter options:', response.data);
      setFilterOptions(response.data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortType(sortValue);
    const sortedFilteredProducts = sortProducts(sortValue, [...filteredProducts]);
    setFilteredProducts(sortedFilteredProducts);
  };

  const handleFilterChange = (filter: string) => {
    const filtered = products.filter((product) => product.category === filter);
    if (!filter) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(filtered);
  };

  const sendChosenInterest = async (filter: string) => {
    try {
      if (!chosenInterests.includes(filter) && filter !== "") {
        setChosenInterests([...chosenInterests, filter]);
      }
      
      const payload = {
        chosenOption: filter,
        userEmail: user?.email 
      };

      const response = await axios.post('http://localhost:5000/api/register_interest', payload);
      console.log('POST response:', response.data);
    } catch (error) {
      console.error('Error sending chosen interest:', error);
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
          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Electronics">Electronics</option>
            <option value="Office">Office</option>
          </select>
        </div>

        <div className="sort-options">
          <label htmlFor="interest">Choose interest in category: </label>
          <select onChange={(e) => sendChosenInterest(e.target.value)}>
            <option value="">None</option>
            <option 
              value="Electronics" 
              style={{ backgroundColor: chosenInterests.includes("Electronics") ? 'lightgreen' : 'white' }}
            >
              Electronics
            </option>
            <option 
              value="Home Appliances" 
              style={{ backgroundColor: chosenInterests.includes("Home Appliances") ? 'lightgreen' : 'white' }}
            >
              Home Appliances
            </option>
            <option 
              value="Clothing and Apparel" 
              style={{ backgroundColor: chosenInterests.includes("Clothing and Apparel") ? 'lightgreen' : 'white' }}
            >
              Clothing and Apparel
            </option>
            <option 
              value="Beauty and Personal Care" 
              style={{ backgroundColor: chosenInterests.includes("Beauty and Personal Care") ? 'lightgreen' : 'white' }}
            >
              Beauty and Personal Care
            </option>
            <option 
              value="Health and Wellness" 
              style={{ backgroundColor: chosenInterests.includes("Health and Wellness") ? 'lightgreen' : 'white' }}
            >
              Health and Wellness
            </option>
            <option 
              value="Furniture" 
              style={{ backgroundColor: chosenInterests.includes("Furniture") ? 'lightgreen' : 'white' }}
            >
              Furniture
            </option>
            <option 
              value="Books and Stationery" 
              style={{ backgroundColor: chosenInterests.includes("Books and Stationery") ? 'lightgreen' : 'white' }}
            >
              Books and Stationery
            </option>
            <option 
              value="Toys and Games" 
              style={{ backgroundColor: chosenInterests.includes("Toys and Games") ? 'lightgreen' : 'white' }}
            >
              Toys and Games
            </option>
            <option 
              value="Automotive" 
              style={{ backgroundColor: chosenInterests.includes("Automotive") ? 'lightgreen' : 'white' }}
            >
              Automotive
            </option>
            <option 
              value="Sports and Outdoors" 
              style={{ backgroundColor: chosenInterests.includes("Sports and Outdoors") ? 'lightgreen' : 'white' }}
            >
              Sports and Outdoors
            </option>
            <option 
              value="Home and Garden" 
              style={{ backgroundColor: chosenInterests.includes("Home and Garden") ? 'lightgreen' : 'white' }}
            >
              Home and Garden
            </option>
            <option 
              value="Pet Supplies" 
              style={{ backgroundColor: chosenInterests.includes("Pet Supplies") ? 'lightgreen' : 'white' }}
            >
              Pet Supplies
            </option>
            <option 
              value="Jewelry and Accessories" 
              style={{ backgroundColor: chosenInterests.includes("Jewelry and Accessories") ? 'lightgreen' : 'white' }}
            >
              Jewelry and Accessories
            </option>
            <option 
              value="Consumer Services" 
              style={{ backgroundColor: chosenInterests.includes("Consumer Services") ? 'lightgreen' : 'white' }}
            >
              Consumer Services
            </option>
            <option 
              value="Collectibles and Antiques" 
              style={{ backgroundColor: chosenInterests.includes("Collectibles and Antiques") ? 'lightgreen' : 'white' }}
            >
              Collectibles and Antiques
            </option>
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
