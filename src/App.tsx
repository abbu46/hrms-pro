import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeProvider from "./context/EmployeeContext";
import Payroll from "./pages/Payroll";

function App() {
  return (
    <EmployeeProvider>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/attendance" element={<Attendance />} />

        <Route path="/leaves" element={<Leaves />} />

        <Route 
        path="/payroll" element={<Payroll />} />

        <Route 
          path="/employee-Profile/:id" 
          element={<EmployeeProfile />} 
        />

      </Routes>

    </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;