import React from 'react';
import { useUser } from "../components/UserContext";
import "../styling/Header.css";


export interface CartItem {
  p_id: number;
  name: string;
  quantity: number;
  imageUrl: string;
  price: number;
}

export interface User {
  id: number;
  name: string;
}

interface PurchaseButtonProps {
    product: CartItem;
    buyerEmail: string | undefined;
    onPurchase: (productId: number, buyerEmail: string | undefined, sellerId: number) => void;
  }

const { user } = useUser();


const PurchaseButton: React.FC<PurchaseButtonProps> = ({ product, onPurchase }) => {

    
  const handlePurchase = () => {
    onPurchase(product.p_id, user?.email, product.p_id);
  };

  return (
    <button className='checkout-btn' onClick={handlePurchase}>Purchase</button>
);
};

export default PurchaseButton;
