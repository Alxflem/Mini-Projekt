import './App.css'
import LandingPage from './pages/LandingPage';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/HomePage';
const App = () => {

  return (
  
      <div>
      
        <Router>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage userData={{
            firstName: 'Tester',
            lastName: 'Testerson',
            dateOfBirth: '06/02/2003',
            email: 'test@example.com',
            username: 'testerino',
            password: 'password123',
            purchaseHistory: [],
            sellingItems: []
          }} />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Router>
    
      </div>
    
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
