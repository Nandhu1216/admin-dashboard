import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Routes() {

  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);

  // Fetch routes from backend
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/routes");
      setRoutes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete route
  const deleteRoute = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/routes/${id}`);
      fetchRoutes(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>

      <h1 style={{ color: "white" }}>Routes</h1>

      {/* Routes List */}
      <div style={{ marginTop: "20px" }}>
        {routes.map((route) => (
          <div key={route._id} style={routeCard}>

            {/* Route Info */}
            <div>
              <h3 style={{ margin: 0 }}>{route.routeName}</h3>
              <p style={{ margin: "4px 0 0 0", opacity: 0.7 }}>
                {route.checkpoints?.length || 0} Checkpoints
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>

              {/* ⭐ VIEW BUTTON */}
              <button
                onClick={() => navigate(`/routes/view/${route._id}`)}
                style={viewBtn}
              >
                View
              </button>

              {/* ⭐ DELETE BUTTON */}
              <button
                onClick={() => deleteRoute(route._id)}
                style={deleteBtn}
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/routes/create")}
        style={fabStyle}
      >
        +
      </button>

    </Layout>
  );
}

/* STYLES */

const routeCard = {
  background: "#1e293b",
  padding: "16px",
  borderRadius: "10px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white"
};

const viewBtn = {
  background: "#3b82f6",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const fabStyle = {
  position: "fixed",
  bottom: "30px",
  left: "30px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "none",
  background: "#38bdf8",
  fontSize: "30px",
  color: "white",
  cursor: "pointer"
};

export default Routes;
