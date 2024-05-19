
import '../styling/HomePage.css';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  userData: {
    name: string;
    email: string;
    //other user properties
  };
}



const HomePage: React.FC<UserProfileProps> = ({ userData }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/landing');
  };

  return (
    <div className="home-page">
      <h1 className="store-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>NerdStore</h1>
      <h1 className='page-title'>Products List</h1>
      <div className="user-profile">
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default HomePage;