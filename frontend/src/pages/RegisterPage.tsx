import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();



  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
      birth_date: dateofbirth,
      first_name: firstname,
      last_name: lastname,
      email: email,
    };

    try {
      
      await axios.post("http://127.0.0.1:5000/api/reg_user", userData);
      setSuccess("User added successfully!");
      setError("");
    } catch (error) {
      setError("Failed to add user.");
      setSuccess("");
    }
    
    if (
      password !== confirmPassword &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      setError("Passwords do not match");
      return;
    }
      setSuccess("Registration successful!");
    navigate("/");
  };

  return (
    <div
      id="maindiv"
      className="h-screen w-screen flex items-center justify-center"
    >
      <div id="centerdiv" className="text-center p-10">
        <h1 className="py-10 text-4xl">Register Page</h1>
        <div className="bg-slate-300 border border-2 border-gray-500 p-10 rounded-xl shadow-sm">
          <form className="" onSubmit={handleRegister}>
            <div className=" flex justify-end p-5">
              <label className="px-10" htmlFor="email">
                First name
              </label>
              <input
                className="border border-black"
                type="fistname"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="flex justify-end p-5">
              <label className="px-10" htmlFor="email">
                Last name
              </label>
              <input
                className="border border-black"
                type="lastname"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="flex justify-end p-5">
              <label className="px-10" htmlFor="email">
                Date of birth
              </label>
              <input
                className="border border-black"
                type="dateofbirth"
                id="dateofbirth"
                name="dateofbirth"
                value={dateofbirth}
                onChange={(e) => setDateofbirth(e.target.value)}
              />
            </div>
            <div className="flex justify-end p-5">
              <label className="px-10" htmlFor="email">
                Username
              </label>
              <input
                className="border border-black"
                type="username"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex justify-end p-5">
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
            <div className="flex justify-end p-5">
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
            <div className="flex justify-center p-5">
              <label className="px-10" htmlFor="email">
                Confirm Password
              </label>
              <input
                className="border border-black"
                type="confirmpassword"
                id="confirmpassword"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              className="h-10 w-20 border border-black rounded-xl hover:bg-slate-200 hover:shadow-xl"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
