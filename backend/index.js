import express from "express";
import mysql from "mysql";
import cors from "cors"

const app = express();

// app이 포트번호를 listen하도록 원하는 번호를 적는다.
app.listen(8800, () => {
  console.log("connected to backend")
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "todolist"
})

app.use(express.json())
app.use(cors())

// get 요청 보내기
app.get("/", (req, res) => {
  res.json("hello this is the backend")
})

// get으로 테이블 정보 가져오기
app.get("/todolist", (req, res) => {
  const q = "select * from todo"
  db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

// post로 할 일 생성하기
app.post("/todolist", (req, res) => {
  const q = "insert into todo (`content`) values (?)"
  const values = [req.body.content]

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("Todo has been created successfully")
  })
})

// 삭제 기능 구현
app.delete("/todolist/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "delete from todo where id = ?"

  db.query(q, [todoId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Todo has been deleted successfully")
  })
})

// 수정 기능 구현
app.put("/todolist/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "update todo set `content` = ? where id = ?"

  const values = [
    req.body.content
  ]

  db.query(q, [...values, todoId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Todo has been updated successfully")
  })
})