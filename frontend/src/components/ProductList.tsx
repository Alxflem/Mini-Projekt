import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/ProductsList.css';

// Define interface for product
interface Product {
  p_id: number;
  name: string;
  price: number;
  image: string;
  // Add other attributes here
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/api/products')
      .then(response => {
        console.log('API response:', response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      });
  }, []); // empty dependency array ensures this effect runs only once, similar to componentDidMount

  useEffect(() => {
    console.log('Products state:', products); 
  }, [products]); // log products state whenever it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if products is truthy and an array before rendering
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="product-list">
      <section className="product-row">
        {products.map(product => (
          <button 
            key={product.p_id} 
            className="product-card"
            onClick={() => navigate(`/product/${product.p_id}`)}
          >
            <img src={product.image} alt={product.name} />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </button>
        ))}
      </section>
    </div>
  );
};

export default ProductList;
