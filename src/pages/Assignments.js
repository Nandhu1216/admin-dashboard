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

  const addRoute = () => {
    if (!selectedRouteId) return;

    const route = routes.find(r => r._id === selectedRouteId);

    if (selectedRoutes.some(r => r.routeId === route._id)) return;

    setSelectedRoutes([
      ...selectedRoutes,
      { routeId: route._id, routeName: route.routeName }
    ]);
  };

  const removeRoute = (index) => {
    const updated = [...selectedRoutes];
    updated.splice(index, 1);
    setSelectedRoutes(updated);
  };

  const createAssignment = async () => {
    const payload = {
      guardId: selectedGuard._id,
      date,
      shift,
      routes: selectedRoutes
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

      <h2 style={{ marginBottom: "20px", color: "#e2e8f0", letterSpacing: "1px" }}>
        Assignments
      </h2>

      {/* GUARD LIST */}
      {!selectedGuard && (
        <div style={card}>
          {guards.map(g => (
            <div
              key={g._id}
              style={row}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#334155";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#1e293b";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => selectGuard(g)}
            >
              {g.name}
            </div>
          ))}
        </div>
      )}

      {/* ASSIGNMENT VIEW */}
      {selectedGuard && !showForm && (
        <>
          <button style={buttonStyle} onClick={() => setSelectedGuard(null)}>
            ← Back
          </button>

          <h3 style={{ marginTop: "10px", color: "#e2e8f0" }}>
            {selectedGuard.name}
          </h3>

          <button style={buttonStyle} onClick={() => setShowForm(true)}>
            + Assign
          </button>

          {assignments.map((a, i) => (
            <div key={i} style={card}>
              <b>{a.shift}</b> ({a.date})

              {a.routes
                ?.sort((a, b) => a.order - b.order)
                .map((r, index) => (
                  <div key={index} style={{ marginTop: "5px", color: "#cbd5f5" }}>
                    {r.order}. {r.routeName}
                  </div>
                ))
              }
            </div>
          ))}
        </>
      )}

      {/* CREATE FORM */}
      {showForm && (
        <>
          <button style={buttonStyle} onClick={() => setShowForm(false)}>
            ← Back
          </button>

          <div style={{ marginTop: "10px" }}>
            <input
              style={inputStyle}
              type="date"
              onChange={e => setDate(e.target.value)}
            />

            <select style={inputStyle} onChange={e => setShift(e.target.value)}>
              <option>morning</option>
              <option>evening</option>
              <option>night</option>
            </select>
          </div>

          {/* SELECT ROUTE */}
          <div style={{ marginTop: "10px" }}>
            <select style={inputStyle} onChange={e => setSelectedRouteId(e.target.value)}>
              <option value="">Select Route</option>
              {routes.map(r => (
                <option key={r._id} value={r._id}>
                  {r.routeName}
                </option>
              ))}
            </select>

            <button style={buttonStyle} onClick={addRoute}>
              + Add Route
            </button>
          </div>

          {/* SELECTED ROUTES */}
          <div style={card}>
            <h4 style={{ color: "#e2e8f0" }}>Selected Routes</h4>

            {selectedRoutes.map((r, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  color: "#cbd5f5"
                }}
              >
                <span>{index + 1}. {r.routeName}</span>

                <button style={dangerBtn} onClick={() => removeRoute(index)}>
                  ❌
                </button>
              </div>
            ))}
          </div>

          <button style={buttonStyle} onClick={createAssignment}>
            Save
          </button>
        </>
      )}

    </Layout>
  );
}

/* ================= STYLES ================= */

const card = {
  background: "linear-gradient(145deg, #0f172a, #020617)",
  padding: "18px",
  marginBottom: "18px",
  borderRadius: "16px",
  border: "1px solid #1e293b",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
  transition: "0.3s ease"
};

const row = {
  padding: "16px",
  background: "#1e293b",
  marginBottom: "12px",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.25s ease"
};

const buttonStyle = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "#fff",
  cursor: "pointer",
  marginTop: "12px",
  fontWeight: "600",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 12px rgba(59,130,246,0.3)"
};

const inputStyle = {
  padding: "12px",
  marginTop: "10px",
  marginRight: "10px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
  outline: "none"
};

const dangerBtn = {
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600"
};

export default Assignments;