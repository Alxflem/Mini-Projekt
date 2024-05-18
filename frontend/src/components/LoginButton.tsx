import { useState } from 'react';
import '../styling/LoginButton.css';
import { useNavigate } from 'react-router-dom';


const LoginButton = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = localStorage.getItem('userName');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('userName', username); //TODO: update username according to the database 
    navigate('/'); //navigate back to landing page  
}; 
  
  return (

    <div className="login-container">
        <button className="login-button" onClick={() => {
            handleLogin('placeholder_username'); //replace with actual username retrieval
            (isLoggedIn ? navigate('/profile') : navigate('/login'));
            }}>
            {isLoggedIn ? userName : 'Log in'}
        </button>
    </div>

  );
};

export default LoginButton;