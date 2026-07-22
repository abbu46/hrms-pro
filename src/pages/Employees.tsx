function Employees(){
  return(
    <div>
      <h1>Employees</h1>
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