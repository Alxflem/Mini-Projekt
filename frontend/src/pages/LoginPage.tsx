import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Replace this with real authentication logic
    const hardcodedEmail = "test@example.com";
    const hardcodedPassword = "password123";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      navigate("/landing", { state: { email } });
    } else {
      setError("Invalid email or password");
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
      </div>
    </div>
  );
};

export default LoginPage;