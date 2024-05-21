import "../styling/LandingPage.css";
import ProductList from "../components/ProductList";
import ViewProducts from "../components/ViewProducts";
import LoginButton from "../components/LoginButton";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

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
            <div className="">
              <button
                className="login-button"
                onClick={() => {
                  navigate("/sell");
                }}
              >
                <p>{user?.email || "guest"}</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
