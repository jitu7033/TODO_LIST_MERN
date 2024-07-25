
import React, { useEffect, useState } from "react"
import TodoCards from "./TodoCards"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update'
import axios from "axios";
import "./Todo.css"

let id = sessionStorage.getItem("id")
let todoUpdateArray =[];

const Todo = ()=>{
  const[Inputs,setInputs] = useState({
    title :"",
    body : ""
  });
  const[Array,setArray] = useState([])
  
  const show = () =>{
    document.getElementById("textarea").style.display = "block"
  }
  const change = (e)=>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]: value});
  };
  const submit = async() =>{
    if(Inputs.title==="" || Inputs.body===""){
      toast.error("title or body is should not be empty !")
    }
    else{
      if(id){
        await axios
        .post("http://localhost:8080/api/v2/addTask",{
          title:Inputs.title,
          body: Inputs.body,
          id:id
        }).then((res)=>{
          console.log(res);
        });
        setInputs({title : "",body:""});
        toast.success("task Added succesfully ")
      }
      else{
        setArray([...Array,Inputs]);
        setInputs({
          title : "",body:""
        })
        toast.success("Your task is Added")
        toast.error("your task is not saved ! please signup ")
      }
    }
  
  };
  const del = async (Cardid) =>{
    if(id){
      await axios
      .delete(`http://localhost:8080/api/v2/deleteTask/${Cardid}`,{
        data : {id : id}
      })
      .then((res)=>{
        toast.success("Delete SuccessFully ")
      });
    }
    else{
      toast.error("please signup firsts ")
    }
  }

  const dis = (value) =>{
     document.getElementById("todo-update").style.display = value;
  }


  const update = (value) =>{
      // console.log(value)  
      todoUpdateArray = Array[value];
  };
  
      useEffect(()=>{
      if(id){
        const fetch = async()=>{
          await axios
          .get(`http://localhost:8080/api/v2/getTask/${id}`)
          .then((res)=>
            {
              setArray(res.data.list)
            });
          };
       fetch(); 
      }
    },[submit])



  return( 
    <>
  <div className="todo">
    <ToastContainer/>
    <div className="todo-main container my-4 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column todo-Inputs-div w-50 my-1" >
        <input 
        className="my-3 p-2 todo-Inputs" 
        type="text" 
        name="title"
        value={Inputs.title}
        placeholder="TITLE" 
        onClick={show}
        onChange={change}
        />
        <textarea
         id="textarea" 
         className="p-2 todo-Inputs" 
         type="text" 
         name = "body"
         value={Inputs.body}
         onChange={change}
         placeholder="BODY"/>
      </div>
      <div className=" w-50 d-flex justify-content-end" onClick={submit}><button className="home-btn px-2 py-1">ADD</button></div>

    </div>
    <div className="todo-body">
      <div className="container">
        <div className="row ">
          {Array && 
          Array.map((item,index)=>(
            <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                <TodoCards
                title={item.title} 
                body={item.body}
                 id = {item._id} 
                 delid = {del}
                 display={dis}
                 updateId = {index}
                 toBeUpdate={update}

                 />
            </div>
        ))}
        </div>
      </div>
    </div>
  </div>
  <div className="todo-update" id="todo-update">
    <div className="container update p-5">
       <Update  display={dis}  update = {todoUpdateArray}/>
    </div>

  </div>
  </>
  )
}


export default Todo