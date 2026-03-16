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

    const usersRes = await axios.get("https://patrolsense-backend.onrender.com/api/users");
    const routesRes = await axios.get("https://patrolsense-backend.onrender.com/api/routes");
    const plansRes = await axios.get("https://patrolsense-backend.onrender.com/api/plans");

    setGuards(usersRes.data.filter(u => u.role === "guard"));
    setRoutes(routesRes.data);
    setPlans(plansRes.data);
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

    } catch (err) {
      console.log(err);
      alert("Error creating assignment");
    }
  };

  return (

    <div style={{ padding: 20 }}>

      <h2>Create Assignment</h2>

      <div style={row}>
        <label>Guard</label>
        <select onChange={(e) => setGuardId(e.target.value)}>
          <option>Select Guard</option>
          {guards.map(g => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div style={row}>
        <label>Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </div>

      <div style={row}>
        <label>Shift</label>
        <select onChange={(e) => setShift(e.target.value)}>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </div>

      <div style={row}>
        <label>Assignment Type</label>

        <select
          onChange={(e) => setAssignmentType(e.target.value)}
        >
          <option value="plan">Patrol Plan</option>
          <option value="route">Single Route</option>
        </select>
      </div>

      {assignmentType === "plan" && (
        <div style={row}>
          <label>Select Plan</label>
          <select onChange={(e) => setPlanId(e.target.value)}>
            <option>Select Plan</option>

            {plans.map(p => (
              <option key={p._id} value={p._id}>
                {p.planName}
              </option>
            ))}

          </select>
        </div>
      )}

      {assignmentType === "route" && (
        <div style={row}>
          <label>Select Route</label>

          <select onChange={(e) => setRouteId(e.target.value)}>
            <option>Select Route</option>

            {routes.map(r => (
              <option key={r._id} value={r._id}>
                {r.routeName}
              </option>
            ))}

          </select>
        </div>
      )}

      <button onClick={createAssignment} style={btn}>
        Create Assignment
      </button>

    </div>
  );
}

const row = {
  marginBottom: "15px",
  display: "flex",
  gap: "10px",
  alignItems: "center"
};

const btn = {
  padding: "10px 16px",
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Assignments;