import React, { useState } from "react";
import axios from "axios";
import './Register.css';
import { Navigate, useNavigate } from "react-router-dom";


const Register = () => {
const [form,setForm] = useState({
  name:"",
  email:"",
  password:"",
  conformPassword:'',
  gender:"",
  age:"",
})

const navigate=useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if(form.password!==form.conformPassword){
      alert('Password do not Match')
      return;
    }
    try{
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registration successful! Please login.");
      navigate('/');

    }catch(err){
      alert("Registration failed");
    }
  };
   return (
  <div className="register-page">

    <div className="register-card">

      <h2>Create Account</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input 
      type='password'
      name='conformPassword'
      placeholder="conformPassword"
      onChange={handleChange}>
      </input>

      <select name="gender" onChange={handleChange}>
      <option value=''>Select Gender</option>
      <option value='male'>Male</option>
      <option value='female'>Female</option>
      <option value='other'>other</option>
      </select>

       <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />

      <button onClick={handleRegister}>
        Register
      </button>

      <p className="login-link">
        Already have an account? <a href="/">Login</a>
      </p>

    </div>

  </div>
);
};

export default Register;