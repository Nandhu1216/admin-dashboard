import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePlan() {

  const navigate = useNavigate();

  const [planName, setPlanName] = useState("");
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(
        "https://patrolsense-backend.onrender.com/api/routes"
      );
      setRoutes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addRoute = (route) => {

    if (selectedRoutes.find(r => r.routeId === route._id)) return;

    const newRoute = {
      routeId: route._id,
      routeName: route.routeName,
      order: selectedRoutes.length + 1
    };

    setSelectedRoutes(prev => [...prev, newRoute]);
  };

  const removeRoute = (index) => {

    const updated = selectedRoutes.filter((_, i) => i !== index);

    const reordered = updated.map((r, i) => ({
      ...r,
      order: i + 1
    }));

    setSelectedRoutes(reordered);
  };

  const savePlan = async () => {

    if (!planName.trim()) {
      alert("Enter plan name");
      return;
    }

    if (selectedRoutes.length === 0) {
      alert("Add routes to plan");
      return;
    }

    try {

      await axios.post(
        "https://patrolsense-backend.onrender.com/api/plans",
        {
          planName,
          routes: selectedRoutes
        }
      );

      alert("Plan Created Successfully");

      navigate("/plans");

    } catch (err) {
      console.log(err);
      alert("Error creating plan");
    }
  };

  return (

    <div style={{ height: "100vh", padding: "20px", marginLeft: "220px" }}>

      {/* TOP BAR */}
      <div style={topBar}>

        <button onClick={() => navigate("/plans")} style={backBtn}>
          ← Back
        </button>

        <input
          placeholder="Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          style={inputStyle}
        />

        <button onClick={savePlan} style={saveBtn}>
          Save Plan
        </button>

        <div style={countText}>
          Routes: {selectedRoutes.length}
        </div>

      </div>


      {/* AVAILABLE ROUTES */}
      <div style={{ marginTop: 80 }}>

        <h3>Available Routes</h3>

        {routes.map((r) => (
          <div key={r._id} style={routeRow}>

            <span>{r.routeName}</span>

            <button
              onClick={() => addRoute(r)}
              style={warnBtn}
            >
              Add
            </button>

          </div>
        ))}

      </div>


      {/* ROUTES IN PLAN */}
      <div style={{ marginTop: 30 }}>

        <h3>Routes in Plan</h3>

        {selectedRoutes.map((r, i) => (
          <div key={i} style={routeRow}>

            <span>
              {r.order}. {r.routeName}
            </span>

            <button
              onClick={() => removeRoute(i)}
              style={dangerBtn}
            >
              Remove
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}


/* ROW STYLE */

const routeRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
  padding: 10,
  background: "#f1f5f9",
  borderRadius: 6
};


/* SHARED STYLES */

const topBar = {
  position: "absolute",
  top: 10,
  left: 240,
  background: "#1e293b",
  padding: "12px",
  borderRadius: "10px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  zIndex: 10
};

const backBtn = {
  padding: "8px 14px",
  border: "none",
  background: "#475569",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "none",
  width: "180px"
};

const saveBtn = {
  padding: "8px 14px",
  border: "none",
  background: "#22c55e",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const warnBtn = {
  padding: "8px 14px",
  border: "none",
  background: "#f59e0b",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const dangerBtn = {
  padding: "8px 14px",
  border: "none",
  background: "#ef4444",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const countText = {
  color: "white",
  fontWeight: "bold"
};

export default CreatePlan;