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
          <h1>Dashboard Content</h1>
          <p>Manage your employees and HR activities here.</p>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;