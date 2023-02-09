import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Update = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const todoId = location.pathname.split("/")[2];

  const [todo, setTodo] = useState(location.state.todo)

  const handleChange = (e) => {
    setTodo((prev) => ({...prev, [e.target.name]: e.target.value}))
  }


  const handleClick = async (e) => {
    e.preventDefault()
    try{
      await axios.put(`http://localhost:8800/todolist/${todoId}`, todo)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="form">
      <h1>수정하기</h1>
      <input type="text" onChange={handleChange} name="content" value={todo.content}></input>
      <button onClick={handleClick}>수정</button>
    </div>
  )
}

export default Update