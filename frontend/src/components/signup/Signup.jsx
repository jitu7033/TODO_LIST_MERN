import React, { useState } from "react";
import "./Signup.css"
import Heading from "./Headingcomp";
import { useNavigate } from "react-router-dom"; // use to direct signup page to loginpage 
import axios from "axios"


const Signup = () =>{
  const history = useNavigate();

  const[Inputs,setInputs] = useState({
    email : "",
    username : "",
    password : ""
  });
  const change = (e) =>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]:value})
  }
  const submit = async (e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/register",Inputs).then((response) => {
      console.log(response);
      if(response.data.message === ("User already exist please enter new user name")){
        alert(response.data.message);
      }
      alert(response.data.message)
      setInputs({
        email : "",
        username : "",
        password : ""
      });
      history("/signin")  // direct go to sign in page 
    });
    // console.log(Inputs)
  }
  return (
  <div className="signup">
  <div className="container"> 
    <div className="row">
      <div className="col-lg-8 column d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column w-100 p-3">
          <input className="p-2 my-3 input-signup"
           name="email"
            type="email" 
            placeholder="Enter Your Email"
            onChange = {change}
            value={Inputs.email}
            />

            <input className="p-2 my-3 input-signup"
            name="username"
            type="username" 
            placeholder="Enter Your UserName"
            onChange = {change}
            value={Inputs.username}
            />

            <input className="p-2 my-3 input-signup"
            name="password"
            type="password" 
            placeholder="Enter Your password "
            onChange = {change}
            value={Inputs.password}
            />
            <button className="btn-signup p-2" onClick={submit}>SignUp</button>
        </div>
      </div>
      <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center"><Heading first = "Sign" second = "Up" /></div>

    </div>
  </div>
  
  </div>
)};
export default Signup