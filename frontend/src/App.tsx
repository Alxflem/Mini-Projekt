
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";

import SellPage from "./pages/SellPage";
import ProfilePage from './pages/HomePage';


const App = () => {
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
          }}/>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/sell" element={<SellPage />} />
          </Routes>
        </Router>
    
      </div>

  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
