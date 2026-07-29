import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import "./Employees.css";


function Employees() {


  const context = useContext(EmployeeContext);


  if (!context) {
    return <h2>Context not found</h2>;
  }


  const { employees, setEmployees } = context;



  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");

  const [department, setDepartment] = useState("");

  const [position, setPosition] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [search, setSearch] = useState("");



  function addEmployee() {


    const employeeData = {

      name: name,

      department: department,

      position: position,

      status: "Active",

    };



    if (editIndex !== null) {


      const updatedEmployees = [...employees];

      updatedEmployees[editIndex] = employeeData;

      setEmployees(updatedEmployees);

      setEditIndex(null);


    } else {


      setEmployees([...employees, employeeData]);


    }


    setName("");

    setDepartment("");

    setPosition("");

    setShowForm(false);

  }




  const deleteEmployee = (index: number) => {

    const updatedEmployees = employees.filter(
      (_, i) => i !== index
    );

    setEmployees(updatedEmployees);

  };





  const editEmployee = (index: number) => {


    const employee = employees[index];


    setName(employee.name);

    setDepartment(employee.department);

    setPosition(employee.position);

    setEditIndex(index);

    setShowForm(true);


  };





  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );




  return (

    <div className="employees-page">


      <h1>Employees</h1>



      <input

        type="text"

        className="search-box"

        placeholder="Search employee..."

        value={search}

        onChange={(e) => setSearch(e.target.value)}

      />



      <button
        className="add-btn"
        onClick={() => setShowForm(true)}
      >
        + Add Employee
      </button>





      

        
           {showForm && (

  <div className="employee-form-card">


    <h2>
      {editIndex !== null
        ? "Edit Employee"
        : "Add Employee"}
    </h2>



    <input
      type="text"
      placeholder="Enter Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />



    <input
      type="text"
      placeholder="Enter Department"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
    />



    <input
      type="text"
      placeholder="Enter Position"
      value={position}
      onChange={(e) => setPosition(e.target.value)}
    />



    <button onClick={addEmployee}>

      {editIndex !== null
        ? "Update Employee"
        : "Save Employee"}

    </button>


  </div>

)}

      






      <table className="employee-table">


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


          {filteredEmployees.map((employee, index) => (


            <tr key={index}>


              <td>{employee.name}</td>


              <td>{employee.department}</td>


              <td>{employee.position}</td>



              <td>

                <span className="status-active">

                  {employee.status}

                </span>

              </td>





              <td>


                <Link to={`/employee-profile/${index}`}>

                  <button className="action-btn view-btn">

                    View Profile

                  </button>

                </Link>





                <button

                  className="action-btn edit-btn"

                  onClick={() => editEmployee(index)}

                >

                  Edit

                </button>





                <button

                  className="action-btn delete-btn"

                  onClick={() => deleteEmployee(index)}

                >

                  Delete

                </button>



              </td>


            </tr>


          ))}



        </tbody>


      </table>



    </div>

  );

}


export default Employees;