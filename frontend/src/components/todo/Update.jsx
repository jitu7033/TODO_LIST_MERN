import React, { useEffect, useState } from "react";
import "./Todo.css"
import axios from "axios";
import { toast } from "react-toastify";
const Update = ({display,update}) =>{
  
  useEffect(()=>{
    setInputs({
      title:update.title,
      body:update.body});
  },[update])

  const [Inputs,setInputs] = useState({
    title:"",
    body:""
  })
  const change = (e)=>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]: value})

  };

  const submit = async() =>{
    await axios
    .put(`http://localhost:8080/api/v2/updateTask${update._id}`,Inputs)
    .then((res)=>{
      toast.success(res.data.message)
    }) ;
    display("none")
  }
  return (
  <div className="p-5 d-flex justify-content-start align-items-center flex-column update">
    <h3>Update Your Task</h3>
    <input
      className="todo-inputs my-3 w-100 p-3" 
      name="title"
      type="text" value={Inputs.title} onChange={change}
      placeholder="Title"
     />
    <textarea className="todo-inputs my-3 w-100 p-3  "
      type = "text"
      placeholder="Body" value={Inputs.body} onChange={change}
      name="body" id="">
      </textarea>
      <div><button className="btn btn-dark my-4 " onClick={submit} >UPDATE</button>
      <button className="btn btn-danger my-4 mx-3"
       onClick={()=>display("none")}
       >
        ClOSE</button></div>
  </div>
  )
}

export default Update;