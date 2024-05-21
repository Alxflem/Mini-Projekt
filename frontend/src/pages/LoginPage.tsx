import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../components/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 2000 milliseconds = 2 seconds

      const response = await axios.post(
        "http://localhost:5000/api/login",
        loginData
      );
      if (response.data.message === "Login successful!") {
        const userData = response.data.user; // Assuming your API returns user data in response.data.user
        console.log(userData);
        setUser(userData); // Set the user data in the context
        navigate("/landing");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Failed to login.");
    }
  };

  return (
    <div
      id="maindiv"
      className="h-screen w-screen flex items-center justify-center"
    >
      <div id="centerdiv" className="text-center p-10">
        <h1 className="py-10 text-4xl">Login Page</h1>
        <div className="bg-slate-300 border border-2 border-gray-500 p-10 rounded-xl shadow-sm">
          <form onSubmit={handleLogin}>
            <div className="content-center p-5">
              <label className="px-10" htmlFor="email">
                Email
              </label>
              <input
                className="border border-black"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-5">
              <label className="px-10" htmlFor="password">
                Password
              </label>
              <input
                className="border border-black"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              className="h-10 w-20 border border-black rounded-xl hover:bg-slate-200 hover:shadow-xl"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex  items-center justify-center p-5">
          <h1 className="sm px-4 ">Not a member yet?</h1>
          <button
            className="h-10 w-35 border border-black rounded-xl hover:bg-slate-200 hover:shadow-xl"
            onClick={() => navigate("/reg")}
          >
            {" "}
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
