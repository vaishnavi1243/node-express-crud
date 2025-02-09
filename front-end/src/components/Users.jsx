import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
function Users() {
  // State to store user data
  const [users, setUsers] = useState([]);

  // Function to handle delete action
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`) // Use the correct backend URL
      .then((res) => {
        console.log('User deleted successfully:', res.data);
        setUsers(res.data)
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error deleting user:', err.response ? err.response.data : err.message);
      });
  };

  // Function to handle edit action
  const handleEdit = (id) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");
    const newAge = prompt("Enter new age:");

    if (newName && newEmail && newAge) {
      setUsers(
        users.map((user) =>
          user.id === id
            ? { ...user, name: newName, email: newEmail, age: Number(newAge) }
            : user
        )
      );
    }
  };
useEffect(()=>{
  axios.get('http://localhost:3001').then((result)=>{
    setUsers(result.data)
  }).catch((err)=>{
    console.log(err);
  })
},[])
console.log(users,"users")
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Table</h2>
      <Link to='/create'>Add +</Link>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Age</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.age}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              <Link to={`/update/${user._id}`}>update</Link>

                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
