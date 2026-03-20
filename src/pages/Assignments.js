import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function CreatePlan() {

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

      setPlanName("");
      setSelectedRoutes([]);

    } catch (err) {
      console.log(err);
      alert("Error creating plan");
    }
  };

  return (

    <Layout>

      <div>

        <h2 style={title}>Create Patrol Plan</h2>

        {/* PLAN NAME */}
        <div style={card}>
          <label>Plan Name</label>
          <input
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Enter plan name"
            style={input}
          />
        </div>

        {/* MAIN GRID */}
        <div style={grid}>

          {/* AVAILABLE ROUTES */}
          <div style={card}>
            <h3 style={section}>Available Routes</h3>

            {routes.map((r) => (
              <div key={r._id} style={row}>

                <span>{r.routeName}</span>

                <button onClick={() => addRoute(r)} style={addBtn}>
                  Add
                </button>

              </div>
            ))}

          </div>

          {/* SELECTED ROUTES */}
          <div style={card}>
            <h3 style={section}>
              Routes in Plan ({selectedRoutes.length})
            </h3>

            {selectedRoutes.map((r, i) => (
              <div key={i} style={row}>

                <span>
                  {r.order}. {r.routeName}
                </span>

                <button onClick={() => removeRoute(i)} style={removeBtn}>
                  Remove
                </button>

              </div>
            ))}

          </div>

        </div>

        {/* SAVE BUTTON */}
        <button onClick={savePlan} style={mainBtn}>
          Save Plan
        </button>

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
  gap: "20px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  background: "#334155",
  borderRadius: "6px",
  marginBottom: "10px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  marginTop: "5px"
};

const addBtn = {
  background: "#22c55e",
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const removeBtn = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const mainBtn = {
  padding: "12px",
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

export default CreatePlan;