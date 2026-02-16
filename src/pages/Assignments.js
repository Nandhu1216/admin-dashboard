import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Assignments() {

  const [guards, setGuards] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    guardId: "",
    routeId: "",
    date: "",
    shift: "Morning"
  });

  useEffect(() => {
    fetchGuards();
    fetchRoutes();
    fetchAssignments();
  }, []);

  const fetchGuards = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setGuards(res.data.filter(u => u.role === "guard"));
  };

  const fetchRoutes = async () => {
    const res = await axios.get("http://localhost:5000/api/routes");
    setRoutes(res.data);
  };

  const fetchAssignments = async () => {
    const res = await axios.get("http://localhost:5000/api/assignments");
    setAssignments(res.data);
  };

  const createAssignment = async () => {
    try {

      await axios.post("http://localhost:5000/api/assignments", form);

      fetchAssignments();

    } catch {
      alert("Error creating assignment");
    }
  };

  const deleteAssignment = async (id) => {
    await axios.delete(`http://localhost:5000/api/assignments/${id}`);
    fetchAssignments();
  };

  return (
    <Layout>

      <h1 style={{ color: "white" }}>Assignments</h1>

      {/* FORM */}
      <div style={formBox}>

        <select
          onChange={e => setForm({ ...form, guardId: e.target.value })}
          style={input}
        >
          <option>Select Guard</option>
          {guards.map(g => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          onChange={e => setForm({ ...form, routeId: e.target.value })}
          style={input}
        >
          <option>Select Route</option>
          {routes.map(r => (
            <option key={r._id} value={r._id}>
              {r.routeName}
            </option>
          ))}
        </select>

        <input
          type="date"
          onChange={e => setForm({ ...form, date: e.target.value })}
          style={input}
        />

        <select
          onChange={e => setForm({ ...form, shift: e.target.value })}
          style={input}
        >
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <button onClick={createAssignment} style={addBtn}>
          Assign
        </button>

      </div>

      {/* LIST */}
      <div style={{ marginTop: 20 }}>
        {assignments.map(a => (
          <div key={a._id} style={card}>

            <div>
              <h3>{a.guardId?.name}</h3>
              <p>{a.routeId?.routeName}</p>
              <p>{a.date} • {a.shift}</p>
            </div>

            <button
              onClick={() => deleteAssignment(a._id)}
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
  padding: 20,
  borderRadius: 10,
  display: "flex",
  gap: 10,
  flexWrap: "wrap"
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "none"
};

const addBtn = {
  background: "#22c55e",
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  color: "white"
};

const card = {
  background: "#1e293b",
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  color: "white",
  display: "flex",
  justifyContent: "space-between"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  color: "white"
};

export default Assignments;
