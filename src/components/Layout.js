import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  const [open, setOpen] = useState(true);

  return (

    <div style={container}>

      {/* SIDEBAR */}
      {open && <Sidebar />}

      {/* MAIN */}
      <div style={main}>

        {/* TOP BAR */}
        <div style={topbar}>

          <button onClick={() => setOpen(!open)} style={menuBtn}>
            ☰
          </button>

          <h2 style={{ margin: 0 }}>PatrolSense</h2>

        </div>

        {/* CONTENT */}
        <div style={content}>
          {children}
        </div>

      </div>

    </div>
  );
}

/* STYLES */

const container = {
  display: "flex",
  height: "100vh",
  background: "#6089ea"
};

const main = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const topbar = {
  height: "60px",
  background: "rgb(82, 133, 216)",
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  gap: "15px",
  borderBottom: "1px solid #6ca6f8"
};

const menuBtn = {
  fontSize: "20px",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer"
};

const content = {
  padding: "20px",
  overflowY: "auto",
  height: "calc(100vh - 60px)"
};

export default Layout;