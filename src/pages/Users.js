import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    password: "",
    role: "guard"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    try {

      await axios.post("http://localhost:5000/api/users", form);

      setForm({
        name: "",
        employeeId: "",
        password: "",
        role: "guard"
      });

      fetchUsers();

    } catch (err) {
      alert("Error adding user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>

      <h1 style={{ color: "white" }}>Users</h1>

      {/* ADD USER FORM */}
      <div style={formBox}>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={input}
        />

        <input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          style={input}
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={input}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={input}
        >
          <option value="guard">Guard</option>
          <option value="supervisor">Supervisor</option>
        </select>

        <button onClick={addUser} style={addBtn}>
          Add User
        </button>

      </div>

      {/* USERS LIST */}
      <div style={{ marginTop: "20px" }}>
        {users.map((user) => (
          <div key={user._id} style={userCard}>

            <div>
              <h3>{user.name}</h3>
              <p>{user.employeeId} • {user.role}</p>
            </div>

            <button
              onClick={() => deleteUser(user._id)}
              style={deleteBtn}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </Layout>
  );
}

/* STYLES */

const formBox = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none"
};

const addBtn = {
  background: "#22c55e",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const userCard = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  color: "white"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

export default Users;
