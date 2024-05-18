import './App.css'
import LandingPage from './pages/LandingPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  return (
  
      <div>
      
          <Router>
            <Routes>
              <Route path="/welcome" element={<LandingPage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </Router>
      
      </div>
    
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
