import {useState} from "react";



function Attendance(){


  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  const [attendance,setAttendance] = useState([
    { name:"Abrar Abdul",
      department: "IT",
      status: "Present",

  },

  {
    name: "John Smith",
    department:"HR",
    status:"Absent",
  },
]);


const updateStatus = (index: number , status: string ) => {
  const updatedAttendance = [ ...attendance];
  updatedAttendance[index].status = status;
  setAttendance(updatedAttendance);
};
const saveAttendance =() => {
  const record ={
    date: date,
    employees: attendance,
  };
  setAttendanceHistory([...attendanceHistory, record]);
  alert("Attendance saved successfully!");
};

const presentCount= attendance.filter(
  (employee) => employee.status === "Present"
).length;

const absentCount= attendance.filter(
  (employee) => employee.status === "Absent"
).length;


  return (
    <div>
      <h1>Attendance</h1>
      <label>
        Select Date:
        <input type="date" 
        value={date}
        onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <p>Attendance Date:{date}</p>
      <button onClick={saveAttendance}>
        Save Attendance

      </button>



      <div style={{display: "flex", gap: "20px", marginBottom:"20px"}}>
        <div style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px" ,
          width:"150px"
        }}> 
         <h3>Total Employees</h3>
         <h2>{attendance.length}</h2>
         </div>


         <div style = {{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width:"150px"
        
         }}>
          <h3 style={{color:"green"}}>Present</h3>
          <h2>{presentCount}</h2>
          </div>


          <div style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius:"10px",
            width: "150px"
          }}>

            <h3 style={{color:"red"}}>Absent</h3>
            <h2>{absentCount}</h2>

            </div>
            </div>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        
        </thead>
        <tbody>
         { attendance.map((employee, index) => (
          <tr key ={index}>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>
              <span style={{
                color: employee.status === "Present" ? "green" : "red",
                fontWeight:"bold",

              }} >{employee.status}</span>
            </td>




            <td>
              <button onClick={() => updateStatus(index, "Present")}>Present</button>

              <button onClick={() => updateStatus(index, "Absent")}>Absent</button>
          
            </td>
            </tr>
         ))}
          </tbody>
         
        
         
          
    
      </table>
      <h2>Attendance History</h2>
      {attendanceHistory.map((record, index) =>(
        <div key={index}>
          <h3>Date: {record.date}</h3>
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>

              </tr>
            </thead>

            <tbody>
              {record.employees.map((employee:any, empIndex:number) =>(
                <tr key={empIndex}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td style= {{
                    color: employee.status === "Present" ? "green" :"red",
                    fontWeight:"bold"
                  }}>
                     {employee.status}
                     </td>
                
                </tr>
              )) }
            </tbody>
            </table>
            </div>
      ))
        
      }
    </div>
  );
}
export default Attendance;