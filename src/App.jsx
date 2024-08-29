import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";

function App() {

  
  /// UseState Increment

  const [count, setCount] = useState(0);
  const increment= ()=>{
    setCount((count) => count + 1);
  };
  const decrement = ()=>{
    setCount((count) => count - 1);
  };


  /// Fatch Database

  const [data,setData]=useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/users");
        setData( response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);


  //Create User
  // const [newUser, setNewUser] = useState({name: '', email: '' });

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async (e) => {
    
    // e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3000/users", {name: name , email:email});
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <div >
        <button onClick={decrement}> - </button>
        <button onClick={increment}>+</button>
        Result is : {count}



        <div>
          <h1>User List</h1>
          <ul>
            {data.map((user)=>(
              <li key={user.id}>
                {user.name},
                {user.email}</li>
            ))}
          </ul>
          <form action="" onSubmit={addUser}>
            <input type="text" onChange={(e) => setName(e.target.value)}/>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit"> Add User</button>
          </form>
          
        </div>
      </div>
    </>
  );
}

export default App;
