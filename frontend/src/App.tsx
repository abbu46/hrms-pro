import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import EmployeeProfile from "./pages/EmployeeProfile";
import Payroll from "./pages/Payroll";


import EmployeeProvider from "./context/EmployeeContext";
import LeaveProvider from "./context/LeaveContext";
import AttendanceProvider from "./context/AttendanceContext";


import ProtectedRoute from "./components/ProtectedRoute";



function App() {


  return (

    <EmployeeProvider>

      <LeaveProvider>

        <AttendanceProvider>


          <BrowserRouter>


            <Routes>


              <Route 
                path="/" 
                element={<Login />} 
              />



              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />



              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Employees />
                  </ProtectedRoute>
                }
              />



              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />



              <Route
                path="/leaves"
                element={
                  <ProtectedRoute>
                    <Leaves />
                  </ProtectedRoute>
                }
              />



              <Route
                path="/payroll"
                element={
                  <ProtectedRoute>
                    <Payroll />
                  </ProtectedRoute>
                }
              />



              <Route
                path="/employee-profile/:id"
                element={
                  <ProtectedRoute>
                    <EmployeeProfile />
                  </ProtectedRoute>
                }
              />



            </Routes>


          </BrowserRouter>


        </AttendanceProvider>

      </LeaveProvider>

    </EmployeeProvider>

  );

}


export default App;