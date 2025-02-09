import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

function UserUpdate() {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the user ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    axios
  .get(`http://localhost:3001/getUser/${id}`)
  .then((response) => {
    console.log("Fetched User:", response.data);
    setFormData(response.data);
  })
  .catch((err) => {
    console.error("Error fetching user:", err);
  });

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Updated:", formData);
    axios
      .post(`http://localhost:3001/updateUser/${id}`, formData)
      .then(() => {

        alert("User updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
      navigate('/')

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
            min="1"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
