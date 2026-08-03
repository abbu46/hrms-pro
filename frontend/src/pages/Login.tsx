import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {


  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);





  const handleLogin = async () => {


    if (!email || !password) {

      alert("Please enter email and password");

      return;

    }



    try {


      setLoading(true);



      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/auth/login`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            email,

            password,

          }),

        }

      );





      const data = await response.json();





      if (!response.ok) {


        alert(

          data.message || "Login failed"

        );


        return;


      }







      localStorage.setItem(

        "token",

        data.token

      );





      localStorage.setItem(

        "user",

        JSON.stringify(data.user)

      );





      navigate("/dashboard");





    } catch (error) {


      console.log(

        "Login error",

        error

      );



      alert(

        "Server connection failed"

      );



    } finally {


      setLoading(false);


    }


  };







  return (

    <div>


      <h1>

        HRMS Pro Login

      </h1>




      <p>

        Welcome back! Please login to continue.

      </p>





      <input

        type="email"

        placeholder="Email"

        value={email}

        onChange={

          (e) => setEmail(e.target.value)

        }

      />





      <br />

      <br />





      <input

        type="password"

        placeholder="Password"

        value={password}

        onChange={

          (e) => setPassword(e.target.value)

        }

      />





      <br />

      <br />





      <button

        onClick={handleLogin}

        disabled={loading}

      >


        {

          loading

          ? "Logging in..."

          : "Login"

        }


      </button>



    </div>

  );


}


export default Login;