import "../styling/LandingPage.css";
import ProductList from "../components/ProductList";
import ViewProducts from "../components/ViewProducts";
import LoginButton from "../components/LoginButton";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const paragraphStyle: React.CSSProperties = {
    fontWeight: '900',
    marginTop: '2%',
  };

  return (
    <div className="landing-page">
      <LoginButton />
      <main className="main">
        <div className="home__container container">
          <div className="home__data">
            <span className="home__subtitle">Welcome to</span>
            <h1 className="home__title">NerdStore</h1>
            <p className="home__description">
              Your local store with nerd stuff!
            </p>
            <ViewProducts />
            <p style={paragraphStyle}>or maybe</p>
            <div className="sell">
              <button
                className="sell-button"
                onClick={() => {
                  navigate("/sell");
                }}
              >
              <p>Sell nerd stuff!</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
