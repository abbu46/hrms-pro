import {useState} from "react";
function Employees(){

  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([
    {
      name:"Abrar Abdul",
      department:"IT",
      position:"Front-end Developer",
      status:"Active",
    },
    {
      name:"John Smith",
      department:"HR",
      position:"HR Manager",
      status: "Active",
  
    },
  ]);
  const [name,setName] = useState("");
  const [department,setDepartment] = useState("");
  const [position,setPosition] = useState("");


  const addEmployee =() =>{
    const newEmployee ={
      name:name,
      department:department,
      position:position,
      status:"Active",
    };

    setEmployees([...employees,newEmployee]);

    setName("");
    setDepartment("");
    setPosition("");
    

    setShowForm(false);
  };
    

  return(
    <div>
      <h1>Employees</h1>
      <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Employee</button>
      {showForm && (
        <div>
          <h2>Add Employee</h2>
          <input type="text" 
          placeholder="Enter the Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <input type="text" 
          placeholder="Enter the department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          />

          <br /><br />

          <input type="text" 
          placeholder="Enter the position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          />  

          <br /><br />
          <button onClick={addEmployee}>Save</button>
          </div>
          )}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee,index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Employees;