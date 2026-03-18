import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <div style={wrapper}>

      {/* NAVBAR */}
      <div style={navbar}>

        <button onClick={() => setOpen(!open)} style={menuBtn}>
          ☰
        </button>

        <h2 style={logo}>PatrolSense</h2>

      </div>

      {/* MAIN AREA */}
      <div style={main}>

        {/* SIDEBAR */}
        {open && <Sidebar />}

        {/* CONTENT */}
        <div
          style={{
            ...content,
            marginLeft: open ? "220px" : "0px"
          }}
        >
          <Outlet />
        </div>

      </div>

    </div>
  );
}

/* STYLES */

const wrapper = {
  background: "#0f172a",
  minHeight: "100vh",
  color: "white"
};

const navbar = {
  height: "60px",
  background: "#1e293b",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  position: "sticky",
  top: 0,
  zIndex: 100
};

const menuBtn = {
  fontSize: "22px",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer"
};

const logo = {
  marginLeft: "15px",
  fontWeight: "bold"
};

const main = {
  display: "flex"
};

const content = {
  flex: 1,
  padding: "20px",
  transition: "all 0.3s ease"
};

export default Layout;