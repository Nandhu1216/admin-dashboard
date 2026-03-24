import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Assignments() {

  const [guards, setGuards] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const [routes, setRoutes] = useState([]);
  const [plans, setPlans] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("morning");
  const [assignmentType, setAssignmentType] = useState("plan");

  const [routeId, setRouteId] = useState("");
  const [planId, setPlanId] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const users = await axios.get("https://patrolsense-backend.onrender.com/api/users");
    const routesRes = await axios.get("https://patrolsense-backend.onrender.com/api/routes");
    const plansRes = await axios.get("https://patrolsense-backend.onrender.com/api/plans");

    setGuards(users.data.filter(u => u.role === "guard"));
    setRoutes(routesRes.data);
    setPlans(plansRes.data);
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

  const createAssignment = async () => {

    const payload = {
      guardId: selectedGuard._id,
      date,
      shift,
      planId: assignmentType === "plan" ? planId : null,
      routeId: assignmentType === "route" ? routeId : null
    };

    await axios.post(
      "https://patrolsense-backend.onrender.com/api/assignments",
      payload
    );

    alert("Assignment Created");

    setShowForm(false);
    setDate("");
    setPlanId("");
    setRouteId("");

    loadAssignments(selectedGuard._id);
  };

  return (
    <Layout>

      <h2>Assignments</h2>

      {/* GUARDS */}
      {!selectedGuard && (
        <div style={card}>
          {guards.map(g => (
            <div key={g._id} style={row} onClick={() => selectGuard(g)}>
              {g.name}
            </div>
          ))}
        </div>
      )}

      {/* ASSIGNMENT VIEW */}
      {selectedGuard && !showForm && (
        <>
          <button onClick={() => setSelectedGuard(null)}>← Back</button>

          <h3>{selectedGuard.name}</h3>

          <button onClick={() => setShowForm(true)}>+ Assign</button>

          {assignments.map(a => (
            <div key={a._id} style={card}>

              <b>{a.shift}</b> ({a.date})

              {a.routes
                .sort((a,b)=>a.order-b.order)
                .map(r => (
                  <div key={r.routeId}>
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
          <button onClick={() => setShowForm(false)}>← Back</button>

          <input type="date" onChange={e=>setDate(e.target.value)} />

          <select onChange={e=>setShift(e.target.value)}>
            <option>morning</option>
            <option>evening</option>
            <option>night</option>
          </select>

          <select onChange={e=>setAssignmentType(e.target.value)}>
            <option value="plan">Plan</option>
            <option value="route">Route</option>
          </select>

          {assignmentType === "plan" && (
            <select onChange={e=>setPlanId(e.target.value)}>
              {plans.map(p=>(
                <option key={p._id} value={p._id}>{p.planName}</option>
              ))}
            </select>
          )}

          {assignmentType === "route" && (
            <select onChange={e=>setRouteId(e.target.value)}>
              {routes.map(r=>(
                <option key={r._id} value={r._id}>{r.routeName}</option>
              ))}
            </select>
          )}

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