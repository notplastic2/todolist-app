import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Create() {
  const [todo, setTodo] = useState([{
    content: ""
  }])
  
  const handleChange = e => {
    setTodo((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/todolist", todo)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="form">
      <h1>Add New Todo</h1>
      <input type="text" placeholder="할 일을 입력하세요." onChange={handleChange} name="content" />
      <button onClick={handleClick}>+</button>
    </div>
  )
}

export default Create;