import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => { 
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // ✅ Save JWT token
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

      setMessage("Login successful 🎉");
      console.log("Token:", res.data.token);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };
return (
  <div className="login-wrapper">
    <div className="login-card">
      <h2>Welcome Back</h2>
      <p className="login-subtitle">
        Login to continue your fitness journey 💪
      </p>

      <form onSubmit={handleLogin}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p className="account">
Don't have an account? 
<a className="register" href="/register">Register</a>
</p>

      {message && <p className="login-message">{message}</p>}
    </div>
  </div>
);

};

export default Login;
