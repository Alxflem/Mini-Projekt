import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-card__image" />
      <h2 className="product-card__name">{name}</h2>
      <p className="product-card__price">${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;