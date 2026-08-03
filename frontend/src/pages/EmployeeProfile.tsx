import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


type Employee = {
  _id: string;
  name: string;
  department: string;
  position: string;
  status: string;
  email: string;
  joiningDate: string;
};


function EmployeeProfile() {


  const { id } = useParams();


  const [employee, setEmployee] = useState<Employee | null>(null);


  useEffect(() => {


    const fetchEmployee = async () => {


      try {


        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/employees/${id}`
);


        const data = await response.json();


        setEmployee(data);


      } catch (error) {


        console.log("Error fetching employee", error);


      }


    };


    if (id) {

      fetchEmployee();

    }


  }, [id]);





  if (!employee) {

    return <h2>Loading employee...</h2>;

  }





  return (

    <div className="employee-profile">


      <h1>Employee Profile</h1>


      <p>
        <strong>Name:</strong> {employee.name}
      </p>


      <p>
        <strong>Department:</strong> {employee.department}
      </p>


      <p>
        <strong>Position:</strong> {employee.position}
      </p>


      <p>
        <strong>Status:</strong> {employee.status}
      </p>


      <p>
        <strong>Email:</strong> {employee.email}
      </p>


      <p>
        <strong>Joining Date:</strong>{" "}
        {new Date(employee.joiningDate).toLocaleDateString()}
      </p>


    </div>

  );


}


export default EmployeeProfile;