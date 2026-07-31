import { NavLink, useNavigate } from "react-router-dom";


function Sidebar() {


  const navigate = useNavigate();



  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");

  };




  return (

    <aside className="sidebar">


      <h2>
        HRMS Pro
      </h2>



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

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </li>



      </ul>



    </aside>

  );

}


export default Sidebar;