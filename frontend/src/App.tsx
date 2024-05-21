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
import { UserProvider } from "./components/UserContext";
import ProductPage from "./pages/ProductPage";

const App = () => {

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
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
