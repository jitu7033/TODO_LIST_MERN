import React, { useState } from "react";
import "./Signup.css"
import Heading from "./Headingcomp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {authActions} from "../../store"

const Signin = ()=>{
  const dispatch = useDispatch();

  const history = useNavigate();
  const [Inputs,setInputs] = useState({
    email : "",
    password : ""
  })
  const change = (e) =>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]: value});
  }
  const submit = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/signin",Inputs).then((res)=>{
        // console.log(res.data._id)
       sessionStorage.setItem("id",res.data._id)
        setInputs({
          email : "",
          password : ""
        })
        history("/todo");
    })
    
  }
  return(
  <div className="signup">
  <div className="container"> 
    <div className="row">
      <div className="col-lg-8 column d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column w-100 p-3">
            <input className="p-2 my-3 input-signup"
              name="email"
              type="email" 
              placeholder="Enter Your UserName"
              value={Inputs.email}
              onChange={change}
            />

            <input className="p-2 my-3 input-signup"
              name="password"
              type="password" 
              placeholder="Enter Your password "
              value={Inputs.password}
              onChange={change}

            />
            <button className="btn-signup p-2" onClick={submit}>Sign In</button>
        </div>
      </div>
      <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center"><Heading first = "Sign" second = "Up" /></div>

    </div>
  </div>
  
  </div>
  )
}

export default Signin