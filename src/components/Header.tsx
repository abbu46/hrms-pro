import { useNavigate } from "react-router-dom";


function Header() {


  const navigate = useNavigate();


  const username = localStorage.getItem("username");



  const logout = () => {

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("username");

    navigate("/");

  };




  return (

    <div className="header">


      <h3>
        Welcome, {username || "Admin"}
      </h3>



      <button onClick={logout}>
        Logout
      </button>


    </div>

  );

}


export default Header;