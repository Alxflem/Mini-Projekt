import "./App.css";
import LandingPage from "./pages/LandingPage";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";
import SellPage from "./pages/SellPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
      </Router>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default SellPage;
