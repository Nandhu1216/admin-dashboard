import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function CreatePlan() {

  const [plans, setPlans] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [viewPlan, setViewPlan] = useState(null);
  const [editPlan, setEditPlan] = useState(null);

  const [planName, setPlanName] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  useEffect(() => {
    fetchPlans();
    fetchRoutes();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("https://patrolsense-backend.onrender.com/api/plans");
      setPlans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("https://patrolsense-backend.onrender.com/api/routes");
      setRoutes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ROUTES =================

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
    setSelectedRoutes(updated.map((r, i) => ({
      ...r,
      order: i + 1
    })));
  };

  // ================= CREATE =================

  const savePlan = async () => {

    if (!planName.trim() || selectedRoutes.length === 0) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("https://patrolsense-backend.onrender.com/api/plans", {
        planName,
        routes: selectedRoutes
      });

      alert("Plan created");
      resetAll();

    } catch (err) {
      console.log(err);
      alert("Error creating plan");
    }
  };

  // ================= EDIT =================

  const startEdit = (plan) => {
    setEditPlan(plan);
    setPlanName(plan.planName);
    setSelectedRoutes(plan.routes);
  };

  const updatePlan = async () => {
    try {
      await axios.put(
        `https://patrolsense-backend.onrender.com/api/plans/${editPlan._id}`,
        {
          planName,
          routes: selectedRoutes
        }
      );

      alert("Plan updated");
      resetAll();

    } catch (err) {
      console.log(err);
      alert("Error updating plan");
    }
  };

  // ================= DELETE =================

  const deletePlan = async (id) => {

    if (!window.confirm("Delete this plan?")) return;

    try {
      await axios.delete(
        `https://patrolsense-backend.onrender.com/api/plans/${id}`
      );

      fetchPlans();

    } catch (err) {
      console.log(err);
      alert("Error deleting plan");
    }
  };

  // ================= RESET =================

  const resetAll = () => {
    setPlanName("");
    setSelectedRoutes([]);
    setIsCreating(false);
    setEditPlan(null);
    setViewPlan(null);
    fetchPlans();
  };

  // ================= UI =================

  return (

    <Layout>

      <div>

        <h2 style={title}>Patrol Plans</h2>

        {/* ================= LIST ================= */}
        {!isCreating && !viewPlan && !editPlan && (

          <div>

            <button onClick={() => setIsCreating(true)} style={mainBtn}>
              + Create Plan
            </button>

            <div style={{ marginTop: 20 }}>

              {plans.length === 0 && (
                <p style={subText}>No plans available</p>
              )}

              {plans.map(p => (
                <div key={p._id} style={card}>

                  <div>
                    <strong>{p.planName}</strong>
                    <div style={subText}>
                      {p.routes?.length || 0} routes
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>

                    <button onClick={() => setViewPlan(p)} style={viewBtn}>
                      View
                    </button>

                    <button onClick={() => startEdit(p)} style={editBtn}>
                      Edit
                    </button>

                    <button onClick={() => deletePlan(p._id)} style={deleteBtn}>
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        )}

        {/* ================= VIEW ================= */}
        {viewPlan && (

          <div>

            <button onClick={() => setViewPlan(null)} style={backBtn}>
              ← Back
            </button>

            <h3>{viewPlan.planName}</h3>

            {viewPlan.routes.map((r, i) => (
              <div key={i} style={row}>
                {i + 1}. {r.routeName}
              </div>
            ))}

          </div>

        )}

        {/* ================= CREATE / EDIT ================= */}
        {(isCreating || editPlan) && (

          <div>

            <button onClick={resetAll} style={backBtn}>
              ← Back
            </button>

            <input
              placeholder="Plan Name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              style={input}
            />

            <div style={grid}>

              {/* AVAILABLE */}
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
                    <span>{i + 1}. {r.routeName}</span>
                    <button onClick={() => removeRoute(i)} style={removeBtn}>
                      Remove
                    </button>
                  </div>
                ))}

              </div>

            </div>

            <button
              onClick={editPlan ? updatePlan : savePlan}
              style={mainBtn}
            >
              {editPlan ? "Update Plan" : "Save Plan"}
            </button>

          </div>

        )}

      </div>

    </Layout>
  );
}


/* STYLES */

const title = {
  marginBottom: "20px"
};

const section = {
  marginBottom: "10px",
  color: "#cbd5f5",
  fontWeight: "600"
};

const card = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
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
  border: "none",
  marginBottom: "10px"
};

const addBtn = {
  background: "#22c55e",
  border: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const removeBtn = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const mainBtn = {
  background: "#22c55e",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  marginTop: "10px"
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

const viewBtn = {
  background: "#3b82f6",
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const editBtn = {
  background: "#f59e0b",
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default CreatePlan;