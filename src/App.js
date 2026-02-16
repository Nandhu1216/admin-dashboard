import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import RoutesPage from "./pages/Routes";
import Users from "./pages/Users";
import Assignments from "./pages/Assignments";
import Logs from "./pages/Logs";
import Reports from "./pages/Reports";
import CreateRoute from "./pages/CreateRoute";
import ViewRoute from "./pages/ViewRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Main App Pages */}
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/routes/create" element={<CreateRoute />} />
        <Route path="/routes/view/:id" element={<ViewRoute />} />
        <Route path="/users" element={<Users />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
}

export default App;
