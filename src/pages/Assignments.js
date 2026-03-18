import { useState, useEffect } from "react";
import axios from "axios";

function Assignments() {

  const [guards, setGuards] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [plans, setPlans] = useState([]);

  const [guardId, setGuardId] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("morning");

  const [assignmentType, setAssignmentType] = useState("plan");

  const [routeId, setRouteId] = useState("");
  const [planId, setPlanId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("https://patrolsense-backend.onrender.com/api/users");
      const routesRes = await axios.get("https://patrolsense-backend.onrender.com/api/routes");
      const plansRes = await axios.get("https://patrolsense-backend.onrender.com/api/plans");

      setGuards(usersRes.data.filter(u => u.role === "guard"));
      setRoutes(routesRes.data);
      setPlans(plansRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createAssignment = async () => {

    if (!guardId || !date) {
      alert("Fill required fields");
      return;
    }

    const payload = {
      guardId,
      date,
      shift,
      planId: assignmentType === "plan" ? planId : null,
      routeId: assignmentType === "route" ? routeId : null
    };

    try {
      await axios.post(
        "https://patrolsense-backend.onrender.com/api/assignments",
        payload
      );

      alert("Assignment Created");

      // reset
      setGuardId("");
      setDate("");
      setShift("morning");
      setPlanId("");
      setRouteId("");

    } catch (err) {
      console.log(err);
      alert("Error creating assignment");
    }
  };

  return (

    <div>

      <h2 style={title}>Create Assignment</h2>

      {/* BASIC INFO */}
      <div style={card}>

        <h3 style={section}>Basic Info</h3>

        <div style={grid}>

          <div>
            <label>Guard</label>
            <select value={guardId} onChange={(e) => setGuardId(e.target.value)} style={input}>
              <option value="">Select Guard</option>
              {guards.map(g => (
                <option key={g._id} value={g._id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={input}/>
          </div>

          <div>
            <label>Shift</label>
            <select value={shift} onChange={(e) => setShift(e.target.value)} style={input}>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>

        </div>

      </div>

      {/* TYPE */}
      <div style={card}>

        <h3 style={section}>Assignment Type</h3>

        <select value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)} style={input}>
          <option value="plan">Patrol Plan</option>
          <option value="route">Single Route</option>
        </select>

      </div>

      {/* SELECTION */}
      <div style={card}>

        <h3 style={section}>Selection</h3>

        {assignmentType === "plan" && (
          <select value={planId} onChange={(e) => setPlanId(e.target.value)} style={input}>
            <option value="">Select Plan</option>
            {plans.map(p => (
              <option key={p._id} value={p._id}>{p.planName}</option>
            ))}
          </select>
        )}

        {assignmentType === "route" && (
          <select value={routeId} onChange={(e) => setRouteId(e.target.value)} style={input}>
            <option value="">Select Route</option>
            {routes.map(r => (
              <option key={r._id} value={r._id}>{r.routeName}</option>
            ))}
          </select>
        )}

      </div>

      {/* BUTTON */}
      <button onClick={createAssignment} style={btn}>
        Create Assignment
      </button>

    </div>
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
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "15px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  marginTop: "5px"
};

const btn = {
  padding: "12px",
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

export default Assignments;