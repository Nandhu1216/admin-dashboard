import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Reports() {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await axios.get(
        "https://patrolsense-backend.onrender.com/api/reports"
      );

      console.log("REPORTS:", res.data);
      setReports(res.data);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <Layout>

      <div style={pageContainer}>

        <h2 style={title}>Patrol Reports</h2>

        {reports.length === 0 && (
          <p style={{ color: "#94a3b8" }}>No Reports Yet</p>
        )}

        {reports.map(r => (
          <div key={r._id} style={card}>

            <h3 style={routeTitle}>
              {r.routeId?.routeName || "Route"}
            </h3>

            <div style={infoRow}>
              <span>👮 {r.guardId?.name}</span>
              <span>📅 {r.date}</span>
            </div>

            <div style={infoRow}>
              <span>⏱ Start: {new Date(r.startTime).toLocaleTimeString()}</span>
              <span>⏱ End: {new Date(r.endTime).toLocaleTimeString()}</span>
            </div>

            <div style={durationBox}>
              ⌛ Duration: {r.duration} sec
            </div>

          </div>
        ))}

      </div>

    </Layout>
  );
}

/* ================= STYLES ================= */

const pageContainer = {
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto"
};

const title = {
  marginBottom: "20px",
  color: "#e2e8f0",
  fontSize: "24px",
  fontWeight: "600",
  letterSpacing: "1px"
};

const card = {
  background: "linear-gradient(145deg, #0f172a, #020617)",
  color: "#fff",
  padding: "18px",
  marginBottom: "16px",
  borderRadius: "16px",
  border: "1px solid #1e293b",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
  transition: "0.3s ease"
};

const routeTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "10px",
  color: "#38bdf8"
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "6px",
  color: "#cbd5f5",
  fontSize: "14px"
};

const durationBox = {
  marginTop: "12px",
  padding: "8px",
  borderRadius: "8px",
  background: "#1e293b",
  textAlign: "center",
  fontWeight: "600",
  color: "#22c55e"
};

export default Reports;