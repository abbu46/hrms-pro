import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import EmployeeProvider from "./context/EmployeeContext";
import LeaveProvider from "./context/LeaveContext";
import AttendanceProvider from "./context/AttendanceContext";


createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <EmployeeProvider>

      <LeaveProvider>
        
        <AttendanceProvider>

        <App />

        </AttendanceProvider>

      </LeaveProvider>

    </EmployeeProvider>

  </StrictMode>
);