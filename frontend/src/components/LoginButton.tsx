import { useState } from "react";
import "../styling/LoginButton.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginButton = () => {
  const location = useLocation();
  const email = location.state?.email || "guest";

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <button
        className="login-button"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <p>{email}</p>
      </button>
    </div>
  );
};

export default LoginButton;
