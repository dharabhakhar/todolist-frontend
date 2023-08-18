import React from 'react'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Forgot() {
 const [email, setEmail] = useState('');
 const [text, setText] = useState('');
 const [emailError, setEmailError] = useState('');
 const navigate = useNavigate();

 const patt3 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

 const handleEmailChange = (e) => {
  setEmail(e.target.value);
  setEmailError('');
 };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (email === '') {
   setEmailError('Enter Your Email');
   return false;
  }
  else if (patt3.test(email) === false) {
   setEmailError('Enter Valid Email');
   return false;
  }
  else {
   axios.post('http://localhost:5001/users/check_email', {
    email: email
   })
    .then(function (response) {
     console.log(response.data.data[0]._id);
     setText(response.data.status);
     localStorage.setItem('id', response.data.data[0]._id);
     if (response.data.status === "success") {
      var id = localStorage.getItem('id');
      navigate(`/change_password/${id}`);
      // alert(id);
     } else {
      navigate("/forgot");
     }
    })
    .catch(function (error) {
     console.log(error);
    })
  }
 };

 return (
  <>
   <div className="spacer login-form">
    <div className="login-box">
     <h2>Change Password</h2>
     <form onSubmit={handleSubmit}>
      <div className="user-box">
       <input
        type="text"
        placeholder="Enter Your Email"
        value={email}
        onChange={handleEmailChange}
        size="30px" />
       <label>Email</label>
       <span className="error text-secondary">{emailError}</span>
       <br />
       <br />
      </div>

      <div className="user_box mb-3">
       <input
        type="text"
        value={text}
        size="100"
        className="bg-transparent border-0 text-white" />
      </div>
      <input type="submit" className="mx-auto d-block w- btn-grad border-0" value="Enter" />
     </form>
    </div>
   </div>
  </>
 )
}
