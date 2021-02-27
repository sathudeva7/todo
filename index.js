const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
require('dotenv').config();
const path = require('path');
app.use(cors());
app.use(express.json());

//Routes
app.use(express.static(path.join(__dirname, './client/build')));
//create todo

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });

app.post("/todos",async(req,res) => {
    try{
      const {description} = req.body
      const newTodo = await pool.query("INSERT INTO tobo (description) VALUES($1) RETURNING *",[description])
      res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message);
    }
})
//get todos
app.get("/todos",async(req,res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM tobo");
        res.json(allTodos.rows)
    }catch(err){
        console.error(err.message)
    }
})

//get specific todo
app.get("/todos/:id",async(req,res) => {
    try{
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM tobo WHERE todo_id = $1",[id])
        res.json(todo.rows[0])
    }catch(err){
        console.error(err.message)
    }
})

//update todo
app.put("/todos/:id",async(req,res) => {
    try{
        const {id} = req.params
        const {description} = req.body
        const updatetodo = await pool.query("UPDATE tobo SET description = $1 WHERE todo_id = $2",[description,id])
        res.json("updated")
    }catch(err){
        console.error(err.message)
    }
})

//delete todo
app.delete("/todos/:id",async(req,res) => {
    try{
        const {id} = req.params
        const todo = await pool.query("DELETE FROM tobo WHERE todo_id = $1",[id])
        res.json("todo deleted")
    }catch(err){
        console.error(err.message)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log("server started")
})