import "./App.css";
import LandingPage from "./pages/LandingPage";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";
import SellPage from "./pages/SellPage";

import ProfilePage from "./pages/HomePage";
import Header, { CartItem } from "./components/Header";
import { useState } from "react";
import { UserProvider } from "./components/UserContext";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/reg" element={<RegisterPage />} />

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/sell" element={<SellPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
