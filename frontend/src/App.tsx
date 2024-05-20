
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from './pages/HomePage';
import Header, { CartItem } from './components/Header';
import { useState } from 'react';

const App = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
      <div>

        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/reg" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage userData={{
            firstName: 'Tester',
            lastName: 'Testerson',
            dateOfBirth: '06/02/2003',
            email: 'test@example.com',
            username: 'testerino',
            password: 'password123',
            purchaseHistory: [],
          }} cartItems={cartItems} />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Router>
    
      </div>
   
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
