import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Routes() {

  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("https://patrolsense-backend.onrender.com/api/routes");
      setRoutes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoute = async (id) => {
    try {
      await axios.delete(
        `https://patrolsense-backend.onrender.com/api/routes/${id}`
      );
      fetchRoutes();
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>

      <h2 style={title}>Routes</h2>

      {/* ROUTES LIST */}
      <div style={card}>

        {routes.map((route) => (
          <div key={route._id} style={routeRow}>

            <div>
              <strong>{route.routeName}</strong>
              <div style={subText}>
                {route.checkpoints?.length || 0} checkpoints
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>

              <button
                onClick={() => navigate(`/routes/view/${route._id}`)}
                style={viewBtn}
              >
                View
              </button>

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

      {/* ADD BUTTON */}
      <button
        onClick={() => navigate("/routes/create")}
        style={fab}
      >
        +
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
  borderRadius: "12px"
};

const routeRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#334155",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "10px"
};

const subText = {
  fontSize: "12px",
  color: "#94a3b8"
};

const viewBtn = {
  background: "#3b82f6",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const fab = {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  border: "none",
  background: "#22c55e",
  fontSize: "28px",
  color: "white",
  cursor: "pointer"
};

export default Routes;