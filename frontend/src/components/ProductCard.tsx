import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: (name: string, price: number, imageUrl: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, onAddToCart }) => {
  const navigate = useNavigate();

  console.log('ProductCard ID:', id);  // Log the ID to verify it's passed correctly

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    onAddToCart(name, price, imageUrl);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={name} className="product-card__image" />
      <h2 className="product-card__name">{name}</h2>
      <p className="product-card__price">${price.toFixed(2)}</p>
      <button className="product-card__add-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
