import { useEffect, useState } from "react";
import axios from "axios";

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
    <div style={{ padding: 20 }}>

      <h2>Patrol Reports</h2>

      {reports.length === 0 && <p>No Reports Yet</p>}

      {reports.map(r => (
        <div key={r._id} style={card}>

          <h3>{r.routeId?.routeName}</h3>

          <p>👮 Guard: {r.guardId?.name}</p>
          <p>📅 Date: {r.date}</p>

          <p>⏱ Start: {new Date(r.startTime).toLocaleTimeString()}</p>
          <p>⏱ End: {new Date(r.endTime).toLocaleTimeString()}</p>

          <p>⌛ Duration: {r.duration} sec</p>

        </div>
      ))}

    </div>
  );
}

const card = {
  background: "#1e293b",
  color: "#fff",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px"
};

export default Reports;