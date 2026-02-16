import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://patrolsense-backend.onrender.com/api/auth/login", {
        employeeId,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/routes");
    } catch (err) {
      alert("Invalid Login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Super Admin Login</h2>

        <input
          type="text"
          placeholder="Super Admin Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  box: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "10px",
    width: "360px",
    textAlign: "center",
    color: "white"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#38bdf8",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Login;
