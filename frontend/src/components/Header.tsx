import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styling/LoginButton.css";
import "../styling/Header.css";
import { ShoppingCart } from 'lucide-react';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  imageUrl: string;
  price: number;
}

interface HeaderProps {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null); // Ref for the cart window

  const handleTitleClick = () => {
    navigate('/landing');
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const removeItemFromCart = (id: number) => {
    removeFromCart(id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setIsCartVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartItems]);

  return (
    <header>
        <div className="header-content">
        <h1 className="store-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          NerdStore
        </h1>
        <button className="cart-button" onClick={toggleCartVisibility}>
        <ShoppingCart />
        </button>
      </div>
      {isCartVisible && (
        <div className="cart-window" ref={cartRef}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                    {item.name} (x{item.quantity}) - ${item.price}
                    <button onClick={() => removeItemFromCart(item.id)} className='remove-btn'>Remove</button>
                </li>
                ))}
            </ul>
          )}
          <button className='checkout-btn'>Checkout</button>
        </div>
      )}
      <script src="https://kit.fontawesome.com/b636bc1f7e.js" crossOrigin="anonymous"></script>
    </header>
    
  );
};

export default Header;