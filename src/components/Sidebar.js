import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      position: "fixed",
      top: "60px",
      left: 0,
      width: "220px",
      height: "100%",
      background: "#334155",
      padding: "20px",
      color: "white",
      boxShadow: "2px 0 10px rgba(0,0,0,0.3)"
    }}>

      <h2 style={{ marginBottom: "20px" }}>PatrolSense</h2>

      <ul style={{
        listStyle: "none",
        padding: 0,
        lineHeight: "40px"
      }}>
        <li>
          <Link to="/routes" style={linkStyle}>Routes</Link>
        </li>

        <li>
          <Link to="/users" style={linkStyle}>Users</Link>
        </li>

        <li>
          <Link to="/assignments" style={linkStyle}>Assignments</Link>
        </li>

        <li>
          <Link to="/logs" style={linkStyle}>Logs</Link>
        </li>

        <li>
          <Link to="/reports" style={linkStyle}>Reports</Link>
        </li>
      </ul>

    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  display: "block"
};

export default Sidebar;
