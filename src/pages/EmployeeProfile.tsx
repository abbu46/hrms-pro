import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

function EmployeeProfile() {

  const { id } = useParams();

  const context = useContext(EmployeeContext);

  if (!context) {
    return <h2>Context not found</h2>;
  }

  const { employees } = context;

  const employee = employees[Number(id)];


  if (!employee) {
    return (
      <div>
        <h2>Employee not found</h2>
      </div>
    );
  }


  return (
    <div>

      <h1>Employee Profile</h1>

      <h2>{employee.name}</h2>

      <p>Department: {employee.department}</p>

      <p>Position: {employee.position}</p>

      <p>Status: {employee.status}</p>

    </div>
  );
}

export default EmployeeProfile;