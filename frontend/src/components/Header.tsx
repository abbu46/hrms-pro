import { useNavigate } from "react-router-dom";


function Header() {


  const navigate = useNavigate();



  const userData = localStorage.getItem("user");



  const user = userData
    ? JSON.parse(userData)
    : null;





  const logout = () => {


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    navigate("/");


  };







  return (

    <div className="header">


      <h3>

        Welcome, {user?.name || "Admin"}

      </h3>




      <p>

        Role: {user?.role || "HR"}

      </p>





      <button onClick={logout}>

        Logout

      </button>



    </div>

  );


}


export default Header;