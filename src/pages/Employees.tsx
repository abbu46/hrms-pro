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
  const [editIndex,setEditIndex] = useState<number | null>(null);
  const [search,setSearch] = useState("");


  function addEmployee() {
    
      const employeeData ={
        name:name,
        department:department,
        position:position,
        status:"Active",
      };
      if(editIndex !== null){
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = employeeData;
        setEmployees(updatedEmployees);
        setEditIndex(null);

      }   else {
        setEmployees([...employees,employeeData]);
      }
      setName("");
      setDepartment("");
      setPosition("");
      setShowForm(false);
    };
  
    

  const deleteEmployee = (index:number) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const editEmployee = (index:number) => {
    const employee= employees[index];

    setName(employee.name);
    setDepartment(employee.department);
    setPosition(employee.position);
    setEditIndex(index);
    setShowForm(true);
  };

  const filteredEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()));

  return(
    <div>
      <h1>Employees</h1>
      <input 
      type="text"
      placeholder= "search employee..."
      value= {search}
      onChange={(e) => setSearch(e.target.value)}/>

      <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Employee</button>
      {showForm && (
        <div>
          <h2>Add Employee</h2>
          <input
          type="text" 
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
          <button onClick={addEmployee}>{editIndex !== null ? "Update Employee" : "Save"}</button>
          </div>
          )}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee,index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.status}</td>
              <td>
                <button onClick={() => editEmployee(index)}>Edit</button>

                <button onClick={() => deleteEmployee(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Employees;