import React from 'react'
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

export default function ChangePassword() {
 const {id} = useParams();
 const [password, setPassword] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [password1, setPassword1] = useState('');
 const [passwordError1, setPasswordError1] = useState('');
 const [showPassword1, setShowPassword1] = useState(false);
 const navigate = useNavigate();

 const handlePasswordChange = (e) => {
  setPassword(e.target.value);
  setPasswordError('');
 };
 const handlePasswordChange1 = (e) => {
  setPassword1(e.target.value);
  setPasswordError1('');
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (password === '') {
   setPasswordError('Enter Your Password');
   return false;
  }
  else if (password1 === '') {
   setPasswordError1('Enter Your Password');
   return false;
  }
  else if(password === password1) {
   axios.post(`http://localhost:5001/admin/update/${id}`, {
    password: password
   })
    .then(function (response) {
     console.log(response.data);
     if (response.data.status === "success") {
      navigate("/");
     } else {
      navigate("/change_password/:id");
     }
    })
    .catch(function (error) {
     console.log(error);
    })
  }
  else if(password !== password1){
   setPasswordError1("Enter equal password");
  }
 };

 const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
 };
 const togglePasswordVisibility1 = () => {
  setShowPassword1(!showPassword1);
 };

 const show = () => {
  if (showPassword) {
   return <i className="text-secondary"><FaEyeSlash /></i>;
  } else {
   return <i className="text-secondary"><FaEye /></i>;;
  }
 };

 const show1 = () => {
  if (showPassword1) {
   return <i className="text-secondary"><FaEyeSlash /></i>;
  } else {
   return <i className="text-secondary"><FaEye /></i>;;
  }
 };

 return (
  <div>
   <div className="spacer login-form">
    <div className="login-box">
     <h2>Login</h2>
     <form onSubmit={handleSubmit}>
      <div className="user-box">
       <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter Your Password"
        value={password}
        onChange={handlePasswordChange}
        size="30px" />
       <i className="eye" onClick={togglePasswordVisibility}>{show()}</i>
       <label>Password</label>
       <span className="error text-secondary">{passwordError}</span>
       <br />
       <br />
      </div>
      <div className="user-box">
       <input
        type={showPassword1 ? 'text' : 'password'}
        placeholder="Enter Your Password"
        value={password1}
        onChange={handlePasswordChange1}
        size="30px" />
       <i className="eye" onClick={togglePasswordVisibility1}>{show1()}</i>
       <label>Re-enter Password</label>
       <span className="error text-secondary">{passwordError1}</span>
       <br />
       <br />
      </div>
      <input type="submit" className="mx-auto d-block w- btn-grad border-0" value="Change Password" />
     </form>
    </div>
   </div>
  </div>
 )
}
