import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import RoutesPage from "./pages/Routes";
import Users from "./pages/Users";
import Assignments from "./pages/Assignments";
import Logs from "./pages/Logs";
import Reports from "./pages/Reports";
import CreateRoute from "./pages/CreateRoute";
import ViewRoute from "./pages/ViewRoute";
import CreatePlan from "./pages/CreatePlan";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/routes/create" element={<CreateRoute />} />
        <Route path="/routes/view/:id" element={<ViewRoute />} />

        <Route path="/users" element={<Users />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/plans" element={<CreatePlan />} />

        <Route path="/logs" element={<Logs />} />
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </Router>
  );
}

export default App;