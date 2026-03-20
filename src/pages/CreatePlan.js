import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function CreatePlan() {

  const [plans, setPlans] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [isCreating, setIsCreating] = useState(false);

  const [planName, setPlanName] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  useEffect(() => {
    fetchPlans();
    fetchRoutes();
  }, []);

  const fetchPlans = async () => {
    const res = await axios.get("https://patrolsense-backend.onrender.com/api/plans");
    setPlans(res.data);
  };

  const fetchRoutes = async () => {
    const res = await axios.get("https://patrolsense-backend.onrender.com/api/routes");
    setRoutes(res.data);
  };

  const addRoute = (route) => {
    if (selectedRoutes.find(r => r.routeId === route._id)) return;

    setSelectedRoutes(prev => [
      ...prev,
      {
        routeId: route._id,
        routeName: route.routeName,
        order: prev.length + 1
      }
    ]);
  };

  const removeRoute = (index) => {
    const updated = selectedRoutes.filter((_, i) => i !== index);
    setSelectedRoutes(updated.map((r, i) => ({ ...r, order: i + 1 })));
  };

  const savePlan = async () => {

    if (!planName || selectedRoutes.length === 0) {
      alert("Fill all fields");
      return;
    }

    await axios.post("https://patrolsense-backend.onrender.com/api/plans", {
      planName,
      routes: selectedRoutes
    });

    alert("Plan created");

    setPlanName("");
    setSelectedRoutes([]);
    setIsCreating(false);

    fetchPlans();
  };

  return (

    <Layout>

      <div>

        <h2 style={title}>Patrol Plans</h2>

        {/* ================= LIST VIEW ================= */}
        {!isCreating && (

          <div>

            <button onClick={() => setIsCreating(true)} style={mainBtn}>
              + Create Plan
            </button>

            <div style={{ marginTop: 20 }}>

              {plans.map(p => (
                <div key={p._id} style={card}>
                  <strong>{p.planName}</strong>
                  <div style={subText}>
                    {p.routes.length} routes
                  </div>
                </div>
              ))}

            </div>

          </div>

        )}

        {/* ================= CREATE VIEW ================= */}
        {isCreating && (

          <div>

            <button onClick={() => setIsCreating(false)} style={backBtn}>
              ← Back
            </button>

            <div style={card}>
              <input
                placeholder="Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                style={input}
              />
            </div>

            <div style={grid}>

              {/* AVAILABLE ROUTES */}
              <div style={card}>
                <h3 style={section}>Available Routes</h3>

                {routes.map(r => (
                  <div key={r._id} style={row}>
                    <span>{r.routeName}</span>
                    <button onClick={() => addRoute(r)} style={addBtn}>
                      Add
                    </button>
                  </div>
                ))}

              </div>

              {/* SELECTED */}
              <div style={card}>
                <h3 style={section}>
                  Selected ({selectedRoutes.length})
                </h3>

                {selectedRoutes.map((r, i) => (
                  <div key={i} style={row}>
                    <span>{r.order}. {r.routeName}</span>
                    <button onClick={() => removeRoute(i)} style={removeBtn}>
                      Remove
                    </button>
                  </div>
                ))}

              </div>

            </div>

            <button onClick={savePlan} style={mainBtn}>
              Save Plan
            </button>

          </div>

        )}

      </div>

    </Layout>
  );
}


/* STYLES */

const title = { marginBottom: 20 };

const card = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "10px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  background: "#334155",
  borderRadius: "6px",
  marginBottom: "8px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none"
};

const addBtn = {
  background: "#22c55e",
  border: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "6px"
};

const removeBtn = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "6px"
};

const mainBtn = {
  background: "#22c55e",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const backBtn = {
  marginBottom: "10px",
  background: "#475569",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const subText = {
  fontSize: "12px",
  color: "#94a3b8"
};

export default CreatePlan;