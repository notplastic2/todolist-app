import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

function List() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/todolist")
        setTodos(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllTodos()
  }, [])

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:8800/todolist/" + id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
      <h1>할 일 목록</h1>
      <div className='todos'>
        {todos.map(todo => (
          <div className='todo' key={todo.id}>
            <h2>{todo.content}</h2>
            <button className='delete' onClick={() => handleDelete(todo.id)}>삭제</button>
            <button className='update'>
              <Link 
                to={`/update/${todo.id}`} 
                state={{ 'todo': todo }}
              >
                수정
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button><Link to="/create">추가하기</Link></button>
    </>
  )
}

export default List;