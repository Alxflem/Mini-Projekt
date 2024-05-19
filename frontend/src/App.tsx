import "./App.css";
import LandingPage from "./pages/LandingPage";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";

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
        </Routes>
      </Router>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
