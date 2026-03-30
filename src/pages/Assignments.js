import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Assignments() {

  const [guards, setGuards] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const [routes, setRoutes] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("morning");

  // 🔥 NEW
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const users = await axios.get("https://patrolsense-backend.onrender.com/api/users");
    const routesRes = await axios.get("https://patrolsense-backend.onrender.com/api/routes");

    setGuards(users.data.filter(u => u.role === "guard"));
    setRoutes(routesRes.data);
  };

  const loadAssignments = async (guardId) => {
    const res = await axios.get(
      `https://patrolsense-backend.onrender.com/api/assignments/${guardId}`
    );
    setAssignments(res.data);
  };

  const selectGuard = (g) => {
    setSelectedGuard(g);
    loadAssignments(g._id);
  };

  // ===============================
  // 🔥 ADD ROUTE
  // ===============================
  const addRoute = () => {

    if (!selectedRouteId) return;

    const route = routes.find(r => r._id === selectedRouteId);

    // prevent duplicate
    if (selectedRoutes.some(r => r.routeId === route._id)) return;

    setSelectedRoutes([
      ...selectedRoutes,
      { routeId: route._id, routeName: route.routeName }
    ]);
  };

  // ===============================
  // 🔥 REMOVE ROUTE
  // ===============================
  const removeRoute = (index) => {
    const updated = [...selectedRoutes];
    updated.splice(index, 1);
    setSelectedRoutes(updated);
  };

  // ===============================
  // 🔥 CREATE ASSIGNMENT
  // ===============================
  const createAssignment = async () => {

    const payload = {
      guardId: selectedGuard._id,
      date,
      shift,
      routes: selectedRoutes   // 🔥 ARRAY
    };

    await axios.post(
      "https://patrolsense-backend.onrender.com/api/assignments",
      payload
    );

    alert("Assignment Created");

    setShowForm(false);
    setSelectedRoutes([]);
    setDate("");

    loadAssignments(selectedGuard._id);
  };

  return (
    <Layout>

      <h2>Assignments</h2>

      {/* ===============================
          GUARD LIST
      =============================== */}
      {!selectedGuard && (
        <div style={card}>
          {guards.map(g => (
            <div key={g._id} style={row} onClick={() => selectGuard(g)}>
              {g.name}
            </div>
          ))}
        </div>
      )}

      {/* ===============================
          ASSIGNMENT VIEW
      =============================== */}
      {selectedGuard && !showForm && (
        <>
          <button onClick={() => setSelectedGuard(null)}>← Back</button>

          <h3>{selectedGuard.name}</h3>

          <button onClick={() => setShowForm(true)}>+ Assign</button>

          {assignments.map((a, i) => (
            <div key={i} style={card}>

              <b>{a.shift}</b> ({a.date})

              {a.routes
                ?.sort((a, b) => a.order - b.order)
                .map((r, index) => (
                  <div key={index}>
                    {r.order}. {r.routeName}
                  </div>
                ))
              }

            </div>
          ))}
        </>
      )}

      {/* ===============================
          CREATE FORM
      =============================== */}
      {showForm && (
        <>
          <button onClick={() => setShowForm(false)}>← Back</button>

          <input type="date" onChange={e => setDate(e.target.value)} />

          <select onChange={e => setShift(e.target.value)}>
            <option>morning</option>
            <option>evening</option>
            <option>night</option>
          </select>

          {/* SELECT ROUTE */}
          <select onChange={e => setSelectedRouteId(e.target.value)}>
            <option value="">Select Route</option>
            {routes.map(r => (
              <option key={r._id} value={r._id}>
                {r.routeName}
              </option>
            ))}
          </select>

          <button onClick={addRoute}>+ Add Route</button>

          {/* SELECTED ROUTES */}
          <div style={card}>
            <h4>Selected Routes</h4>

            {selectedRoutes.map((r, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{index + 1}. {r.routeName}</span>

                <button onClick={() => removeRoute(index)}>❌</button>
              </div>
            ))}
          </div>

          <button onClick={createAssignment}>Save</button>
        </>
      )}

    </Layout>
  );
}

const card = {
  background: "#1e293b",
  padding: "10px",
  marginBottom: "10px"
};

const row = {
  padding: "10px",
  background: "#334155",
  marginBottom: "8px",
  cursor: "pointer"
};

export default Assignments;