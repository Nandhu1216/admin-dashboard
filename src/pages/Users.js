import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

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
      const res = await axios.get(
        "https://patrolsense-backend.onrender.com/api/users"
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {

    if (!form.name || !form.employeeId || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {

      await axios.post(
        "https://patrolsense-backend.onrender.com/api/users",
        form
      );

      setForm({
        name: "",
        employeeId: "",
        password: "",
        role: "guard"
      });

      fetchUsers();

    } catch {
      alert("Error adding user");
    }
  };

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `https://patrolsense-backend.onrender.com/api/users/${id}`
      );
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <Layout>

      <div>

        <h2 style={title}>Users</h2>

        {/* ADD USER */}
        <div style={card}>

          <h3 style={section}>Add User</h3>

          <div style={grid}>

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

          </div>

          <button onClick={addUser} style={addBtn}>
            Add User
          </button>

        </div>

        {/* USERS LIST */}
        <div style={card}>

          <h3 style={section}>All Users</h3>

          {users.length === 0 && (
            <p style={emptyText}>No users found</p>
          )}

          {users.map((user) => (
            <div key={user._id} style={row}>

              <div>
                <strong>{user.name}</strong>
                <div style={subText}>
                  {user.employeeId} • {user.role}
                </div>
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

      </div>

    </Layout>
  );
}


/* STYLES */

const title = {
  marginBottom: "20px"
};

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px"
};

const section = {
  marginBottom: "10px",
  color: "#cbd5f5"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginBottom: "10px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none"
};

const addBtn = {
  background: "#22c55e",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#334155",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "10px"
};

const subText = {
  fontSize: "12px",
  color: "#94a3b8"
};

const emptyText = {
  color: "#94a3b8"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

export default Users;