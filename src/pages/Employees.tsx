import {useState} from "react";
function Employees(){
  const [showForm, setShowForm] = useState(false);
    

  return(
    <div>
      <h1>Employees</h1>
      <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Employee</button>
      {showForm && (
        <div>
          <h2>Add Employee</h2>
          <input type="text" placeholder="Enter the Name"/>
          <br /><br />
          <input type="text" placeholder="Enter the department"/>
          <br /><br />
          <input type="text" placeholder="Enter the position" />  
          <br /><br />
          <button>Save</button>
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
          <tr>
            <td>Abrar Abdul</td>
            <td>IT</td>
            <td>Front-end Developer</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>John Smith</td>
            <td>HR</td>
            <td>HR Manager</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Employees;