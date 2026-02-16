import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

function CreateRoute() {

  const navigate = useNavigate();

  const [routeName, setRouteName] = useState("");
  const [checkpoints, setCheckpoints] = useState([]);

  // Stable center (prevents relocation bug)
  const [mapCenter] = useState({
    lat: 11.0168,
    lng: 76.9558
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD6C7mjOhiZFmQRZHryeCFIRSrtuEvehWU",
    libraries
  });

  // Add checkpoint
  const handleMapClick = (e) => {
    const newPoint = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setCheckpoints(prev => [...prev, newPoint]);
  };

  // Remove checkpoint
  const removeCheckpoint = (index) => {
    setCheckpoints(prev => prev.filter((_, i) => i !== index));
  };

  // Remove last checkpoint
  const removeLastCheckpoint = () => {
    setCheckpoints(prev => prev.slice(0, -1));
  };

  // Clear all checkpoints
  const clearAllCheckpoints = () => {
    if (window.confirm("Clear all checkpoints?")) {
      setCheckpoints([]);
    }
  };

  // Save route
  const saveRoute = async () => {

    if (!routeName.trim()) {
      alert("Enter route name");
      return;
    }

    if (checkpoints.length === 0) {
      alert("Add at least one checkpoint");
      return;
    }

    try {

      await axios.post("https://patrolsense-backend.onrender.com/api/routes", {
        routeName,
        checkpoints
      });

      alert("Route Saved Successfully");
      navigate("/routes");

    } catch (err) {
      alert("Error saving route");
    }
  };

  if (!isLoaded) return <div style={{ padding: 20 }}>Loading Map...</div>;

  return (

    <div style={{ height: "100vh", width: "100%" }}>

      {/* TOP BAR */}
      <div style={topBar}>

        <button onClick={() => navigate("/routes")} style={backBtn}>
          ← Back
        </button>

        <input
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          style={inputStyle}
        />

        <button onClick={saveRoute} style={saveBtn}>
          Save Route
        </button>

        <button onClick={removeLastCheckpoint} style={warnBtn}>
          Undo Last
        </button>

        <button onClick={clearAllCheckpoints} style={dangerBtn}>
          Clear All
        </button>

        <div style={countText}>
          Points: {checkpoints.length}
        </div>

      </div>

      {/* MAP */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={12}
        onClick={handleMapClick}
      >

        {checkpoints.length > 1 && (
          <Polyline
            path={checkpoints}
            options={{
              strokeColor: "#22c55e",
              strokeWeight: 4
            }}
          />
        )}

        {checkpoints.map((p, i) => (
          <Marker
            key={i}
            position={p}
            onClick={(e) => {
              e.domEvent.stopPropagation();
              removeCheckpoint(i);
            }}
          />
        ))}

      </GoogleMap>

    </div>
  );
}

/* STYLES */

const topBar = {
  position: "absolute",
  top: 10,
  left: 10,
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

export default CreateRoute;
