import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styling/LoginButton.css";
import "../styling/Header.css";
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useUser } from "../components/UserContext";

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

interface Notification {
  id: number;
  user_id: number;
  product_id: number;
  product_type_id: number;
  message: string;
  time_stamp: string;
}

const Header: React.FC<HeaderProps> = ({ cartItems, removeFromCart }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [isNotificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);


  const cartRef = useRef<HTMLDivElement>(null); // Ref for the cart window

  const handleTitleClick = () => {
    navigate('/landing');
  };
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  const toggleNotificationVisibility = () => {
    setNotificationVisible(!isNotificationVisible);
    if (!isNotificationVisible) {
      getNotifications(); 
    }
  };
  const removeItemFromCart = (id: number) => {
    removeFromCart(id);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setIsCartVisible(false);
    }
  };
  const handleClickOutsideNotification = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setNotificationVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartItems]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideNotification);
  }, [notifications]);

  const getNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/messages/' + user?.email);
      console.log('Response:', response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <header>
        <div className="header-content">
        <h1 className="store-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          NerdStore
        </h1>
        <button className="cart-button" onClick={toggleCartVisibility}>
        <ShoppingCart />
        </button>
        <button className='notification-button' onClick={toggleNotificationVisibility}>
        Notifications
        </button>
      </div>
      <div className='cart-notifications'>

      {isNotificationVisible && (
          <div className="notification-window" ref={cartRef}>
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications!</p>
            ) : (
              <ul>
                {notifications.map(notification => (
                  <li key={notification.id}>
                    Your product {notification.product_id} has been bought by {notification.user_id} at {notification.time_stamp}.
                    <br/> Message: {notification.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

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
        
      </div>
      <script src="https://kit.fontawesome.com/b636bc1f7e.js" crossOrigin="anonymous"></script>
    </header>
    
  );
};

export default Header;