import "../styling/LoginButton.css";
import { useNavigate } from "react-router-dom";
import { useUser } from '../components/UserContext';

const LoginButton = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="login-container">
      <button
        className="login-button"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <p>{user?.email || "guest"}</p>
      </button>
    </div>
  );
};

export default LoginButton;
