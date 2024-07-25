import React from "react";
import "./Todo.css"
import { MdAutoDelete } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";

const TodoCards = ({
  title,
  body,
  id,
  delid,
  display,
  updateId,
  toBeUpdate 
})=>{
  return( 
  <div className="p-3 todo-cards">
      <div>
        <h5>{title}</h5>
        <p>{body.split("",77)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        <div className="card-icons-head p-2" onClick={()=>{
          display("block")
          toBeUpdate(updateId);
        }}>
          <MdOutlineUpdate className="card-icons"/>Update
        </div>
        <div className="card-icons-head p-2"  onClick={()=>{
          delid(id);
        }}>
          <MdAutoDelete className="card-icons del"/>Delete
        </div>
      </div>
  </div>
  );
}

export default TodoCards;