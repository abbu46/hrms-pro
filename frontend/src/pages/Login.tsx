import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {


  const navigate = useNavigate();


  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");



  const handleLogin = () => {


    if (!username || !password) {

      alert("Please enter username and password");

      return;

    }



    localStorage.setItem(
      "isLoggedIn",
      "true"
    );


    localStorage.setItem(
      "username",
      username
      
    );


    navigate("/dashboard");


  };





  return (

    <div>


      <h1>HRMS Pro Login</h1>


      <p>
        Welcome back! Please login to continue.
      </p>



      <input

        type="text"

        placeholder="Username"

        value={username}

        onChange={(e)=>setUsername(e.target.value)}

      />



      <br/><br/>



      <input

        type="password"

        placeholder="Password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

      />



      <br/><br/>



      <button onClick={handleLogin}>

        Login

      </button>



    </div>

  );

}


export default Login;