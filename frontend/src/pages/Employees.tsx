import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import "./Employees.css";


function Employees() {

  const context = useContext(EmployeeContext);

  if (!context) {
    return <h2>Context not found</h2>;
  }


  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = context;



  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");

  const [department, setDepartment] = useState("");

  const [position, setPosition] = useState("");

  const [email, setEmail] = useState("");

  const [joiningDate, setJoiningDate] = useState("");

  const [editId, setEditId] = useState<string | null>(null);

  const [search, setSearch] = useState("");



  const handleSaveEmployee = async () => {


    const employeeData = {

      name,

      department,

      position,

      status: "Active",

      email,

      joiningDate,

    };



    if (editId) {


      await updateEmployee(editId, employeeData);

      setEditId(null);


    } else {


      await addEmployee(employeeData);


    }



    setName("");

    setDepartment("");

    setPosition("");

    setEmail("");

    setJoiningDate("");

    setShowForm(false);

  };





  const handleEditEmployee = (employee: any) => {


    setName(employee.name);

    setDepartment(employee.department);

    setPosition(employee.position);

    setEmail(employee.email);

    setJoiningDate(
      employee.joiningDate?.split("T")[0] || ""
    );


    setEditId(employee._id);

    setShowForm(true);


  };





  const handleDeleteEmployee = async (id: string) => {


    await deleteEmployee(id);


  };





  const filteredEmployees = employees.filter((employee) =>

    employee.name
      .toLowerCase()
      .includes(search.toLowerCase())

  );





  return (

    <div className="employees-page">



      <h1>Employees</h1>



      <input

        type="text"

        className="search-box"

        placeholder="Search employee..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />



      <button

        className="add-btn"

        onClick={()=>setShowForm(true)}

      >

        + Add Employee

      </button>





      {showForm && (


        <div className="employee-form-card">


          <h2>

            {editId
              ? "Edit Employee"
              : "Add Employee"}

          </h2>




          <input

            type="text"

            placeholder="Enter Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

          />




          <input

            type="text"

            placeholder="Enter Department"

            value={department}

            onChange={(e)=>setDepartment(e.target.value)}

          />




          <input

            type="text"

            placeholder="Enter Position"

            value={position}

            onChange={(e)=>setPosition(e.target.value)}

          />




          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

          />




          <input

            type="date"

            value={joiningDate}

            onChange={(e)=>setJoiningDate(e.target.value)}

          />




          <button onClick={handleSaveEmployee}>


            {editId
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



          {filteredEmployees.map((employee)=>(



            <tr key={employee._id}>



              <td>{employee.name}</td>


              <td>{employee.department}</td>


              <td>{employee.position}</td>



              <td>

                <span className="status-active">

                  {employee.status}

                </span>


              </td>




              <td>




                <Link to={`/employee-profile/${employee._id}`}>

                  <button className="action-btn view-btn">

                    View Profile

                  </button>


                </Link>





                <button

                  className="action-btn edit-btn"

                  onClick={() =>
                    handleEditEmployee(employee)
                  }

                >

                  Edit

                </button>





                <button

                  className="action-btn delete-btn"

                  onClick={() =>
                    handleDeleteEmployee(employee._id)
                  }

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