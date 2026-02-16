import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* Top Navbar */}
      <div style={{
        height: "60px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 20px"
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            fontSize: "24px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          ☰
        </button>

        <h2 style={{ marginLeft: "20px" }}>PatrolSense</h2>
      </div>

      {/* Sidebar */}
      {open && <Sidebar />}

      {/* Page Content */}
      <div style={{
        padding: "20px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}>
        {children}
      </div>

    </div>
  );
}

export default Layout;
