import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  const [searchData, setSearchData] = useState('')
  const [filterData, setFilterData] = useState([])
  const [editId, setEditId] = useState(null)
  const [editInput, setEditInput] = useState("")
  var url = "https://jsonplaceholder.typicode.com/todos"

  useEffect(()=>{
    fetch(url + "?_limit=10")
      .then((res)=> res.json())
      .then((data)=> setTodos(data));
  },[]);
  async function addTodo() {
    if(!input.trim()) return;
    const newTodo = {
      title: input,
        completed: false
    }
    const res = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }
    );
    const data = await res.json();
    setTodos([...todos,data])
    setInput("");
    console.log(data);
    
  }
  
  async function updateTodo(id) {
    if(!editInput.trim()) return;
    const updatedTodo = {
      title: editInput,
      completed: false
    }
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo)
      });
      if(!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setTodos(todos.map(item => item.id === id ? data : item));
      setEditId(null);
      setEditInput("");
      alert("Cập nhật thành công!");
      console.log(data);
    } catch(error) {
      alert("Lỗi cập nhật: " + error.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE"
      });
      if(!res.ok) throw new Error("Delete failed");
      setTodos(todos.filter(item => item.id !== id));
      alert("Xóa thành công!");
      console.log(todos.filter(item => item.id !== id));
    } catch(error) {
      alert("Lỗi xóa: " + error.message);
    }
  }
  

  useEffect(()=>{
    var filterData = todos.filter((item)=>{
      return item.title.includes(searchData);
    });
    setFilterData(filterData);
  },[searchData, todos]);
  return (
    <>
    <h2>Todo List</h2>
    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='nhap title'/>
    <button onClick={addTodo}>Thêm</button>
    <br/><br/>
    <input type="text" value={searchData} onChange={(e) => setSearchData(e.target.value)} placeholder='Tim kiem...'/>
    <br/><br/>
    {
      filterData.map((item) => {
        return <div key={item.id} style={{border: '1px solid #ccc', padding: '10px', margin: '5px 0'}}>
            {editId === item.id ? (
              <>
                <input type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
                <button onClick={() => updateTodo(item.id)}>Luu</button>
                <button onClick={() => setEditId(null)}>Huy</button>
              </>
            ) : (
              <>
                <p><strong>{item.title}</strong></p>
                <p>{item.body}</p>
                {item.id <= 100 && (
                  <>
                    <button onClick={() => {setEditId(item.id); setEditInput(item.title)}}>Sua</button>
                    <button onClick={() => deleteTodo(item.id)}>Xoa</button>
                  </>
                )}
                {item.id > 100 && <p style={{color: 'red'}}>*(Chỉ hiển thị, không thể sửa/xóa)</p>}
              </>
            )}
        </div> 
      })
    }
      
    </>
  )
}

export default App
