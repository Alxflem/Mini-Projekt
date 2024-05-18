import '../styling/ViewProducts.css';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const navigate = useNavigate();

  const handleViewProductsClick = () => {
    navigate('/products');
  };

  return (
    <div className="view-products-container">
      <button className='view-products-button' onClick={handleViewProductsClick}>Click to View All Our Products</button>
    </div>
  );
};

export default ViewProducts;