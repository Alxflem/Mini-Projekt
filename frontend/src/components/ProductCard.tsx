import React from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: (name: string, price: number, imageUrl: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(name, price, imageUrl);
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-card__image" />
      <h2 className="product-card__name">{name}</h2>
      <p className="product-card__price">${price.toFixed(2)}</p>
      <button className='product-card__add-cart' onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;