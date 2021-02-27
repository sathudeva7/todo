import React,{Fragment,useEffect,useState} from 'react'
import EditTodo from './EditTodo'
function ListTodo() {

const [todos,setTodos] = useState([])

const getTodos = async () => {
    try{
        const response = await fetch("http://104.42.119.14/todos")
        const jsonData = await response.json()
        setTodos(jsonData)
    }catch(err){
        console.log(err.message)
    }
}

useEffect(() => {
    getTodos();
},[])

const deleteTodo = async (id) => {
    try{
        const deleteTodo = await fetch(`http://104.42.119.14/todos/${id}`,{
            method:"DELETE"
        })
        setTodos(todos.filter(todo => todo.todo_id !==id))
        
    }catch(err){

    }
}
  return (
      <Fragment>
   <h1>List Todo</h1>
   <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
      <tr key={todo.todo_id}>
        <td>{todo.description}</td>
        <td><EditTodo todo={todo}/></td>
        <td>
            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
        </td>
      </tr>
      ))}
      
     
    </tbody>
  </table>
   </Fragment>
  )
}

export default ListTodo
