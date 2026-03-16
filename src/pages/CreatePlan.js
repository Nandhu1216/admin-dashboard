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

    if (selectedRoutes.find(r => r._id === route._id)) return;

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

    <div style={{ padding: 20 }}>

      <h2>Create Patrol Plan</h2>

      <input
        placeholder="Plan Name"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
        style={{ padding: 8, width: 250 }}
      />

      <h3>Available Routes</h3>

      {routes.map((r) => (
        <div key={r._id} style={routeRow}>
          <span>{r.routeName}</span>
          <button onClick={() => addRoute(r)}>Add</button>
        </div>
      ))}

      <h3>Routes in Plan</h3>

      {selectedRoutes.map((r, i) => (
        <div key={i} style={routeRow}>
          <span>
            {r.order}. {r.routeName}
          </span>

          <button onClick={() => removeRoute(i)}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={savePlan} style={saveBtn}>
        Save Plan
      </button>

    </div>
  );
}

const routeRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 8,
  padding: 8,
  background: "#f1f5f9",
  borderRadius: 6
};

const saveBtn = {
  marginTop: 20,
  padding: "10px 16px",
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: 6,
  cursor: "pointer"
};

export default CreatePlan;