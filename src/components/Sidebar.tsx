import {Link} from "react-router-dom";

function Sidebar(){
  return(
    <aside className="sidebar">
      <h2>HRMS Pro</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/leaves">Leaves</Link></li>
        <li><Link to="/">Logout</Link></li>
        
      </ul>
    </aside>
  );
}
export default Sidebar;