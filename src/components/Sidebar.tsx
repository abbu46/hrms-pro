import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <aside className="sidebar">

      <h2>HRMS Pro</h2>


      <ul>

        <li>
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>
        </li>


        <li>
          <NavLink to="/employees">
            Employees
          </NavLink>
        </li>


        <li>
          <NavLink to="/attendance">
            Attendance
          </NavLink>
        </li>


        <li>
          <NavLink to="/leaves">
            Leaves
          </NavLink>
        </li>


        <li>
          <NavLink to="/payroll">
            Payroll
          </NavLink>
        </li>


        <li>
          <NavLink to="/">
            Logout
          </NavLink>
        </li>


      </ul>


    </aside>
  );
}


export default Sidebar;