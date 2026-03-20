import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={sidebar}>

      <h3 style={title}>Menu</h3>

      <ul style={menu}>

        <li>
          <NavLink to="/routes" style={linkStyle}>
            Routes
          </NavLink>
        </li>

        <li>
          <NavLink to="/plans" style={linkStyle}>
            Patrol Plans
          </NavLink>
        </li>

        <li>
          <NavLink to="/users" style={linkStyle}>
            Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/assignments" style={linkStyle}>
            Assignments
          </NavLink>
        </li>

        <li>
          <NavLink to="/logs" style={linkStyle}>
            Logs
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports" style={linkStyle}>
            Reports
          </NavLink>
        </li>

      </ul>

    </div>
  );
}

/* STYLES */

const sidebar = {
  position: "fixed",
  top: "60px", // below navbar
  left: 0,
  width: "220px",
  height: "calc(100vh - 60px)",
  background: "#1e293b",
  padding: "20px",
  color: "white",
  borderRight: "1px solid #334155"
};

const title = {
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "bold"
};

const menu = {
  listStyle: "none",
  padding: 0
};

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px",
  marginBottom: "8px",
  textDecoration: "none",
  color: "white",
  borderRadius: "6px",
  background: isActive ? "#334155" : "transparent",
  transition: "0.2s"
});

export default Sidebar;