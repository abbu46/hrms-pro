import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <Header />

        <main>
          <h1>Dashboard</h1>
          <p>Welocme to HRMS pro dashboard.</p>
          <div className="cards">
            <div className="card">
              <h3>Total Employees</h3>
              <p>1</p>
              
            </div>
            <div className="card">
              <h3>Present Today</h3>
              <p>1</p>
            </div>
            <div className="card">
              <h3>Pending Leaves</h3>
              <p>0</p>
          </div>
          <div className="card">
            <h3>Active Employees</h3>
            <p>1</p>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;