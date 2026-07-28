import { useState, useContext } from "react";
import { AttendanceContext } from "../context/AttendanceContext";
import "./Attendance.css";


function Attendance() {

  const context = useContext(AttendanceContext);


  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);



  if (!context) {
    return <h2>Attendance Context not found</h2>;
  }



  const { attendance, setAttendance } = context;



  const updateStatus = (index:number, status:string) => {

    const updatedAttendance = [...attendance];

    updatedAttendance[index].status = status;

    setAttendance(updatedAttendance);

  };



  const saveAttendance = () => {

    const record = {
      date,
      employees: attendance.map((employee)=>({...employee}))
    };


    setAttendanceHistory([...attendanceHistory, record]);

    alert("Attendance saved successfully!");

  };



  const presentCount = attendance.filter(
    employee => employee.status === "Present"
  ).length;


  const absentCount = attendance.filter(
    employee => employee.status === "Absent"
  ).length;



  return (

    <div className="attendance-page">


      <h1>Attendance</h1>


      <label>
        Select Date:

        <input
          
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

      </label>



      <p>Attendance Date: {date}</p>



      <button 
        className="save-btn"
        onClick={saveAttendance}
      >
        Save Attendance
      </button>




      <div className="attendance-cards">


        <div className="attendance-card">
          <h3>Total Employees</h3>
          <h2>{attendance.length}</h2>
        </div>


        <div className="attendance-card">
          <h3>Present</h3>
          <h2>{presentCount}</h2>
        </div>


        <div className="attendance-card">
          <h3>Absent</h3>
          <h2>{absentCount}</h2>
        </div>


      </div>





      <table className="attendance-table">


        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>



        <tbody>


        {attendance.map((employee,index)=>(

          <tr key={index}>


            <td>{employee.name}</td>

            <td>{employee.department}</td>


            <td>

              <span className={
                employee.status === "Present"
                ? "status-present"
                : "status-absent"
              }>
                {employee.status}
              </span>

            </td>



            <td>

              <button
                className="attendance-btn present-btn"
                onClick={()=>updateStatus(index,"Present")}
              >
                Present
              </button>


              <button
                className="attendance-btn absent-btn"
                onClick={()=>updateStatus(index,"Absent")}
              >
                Absent
              </button>


            </td>


          </tr>

        ))}


        </tbody>

      </table>



      <h2>Attendance History</h2>


      {
        attendanceHistory.length === 0 ? (

          <p>No attendance records saved yet.</p>

        ) : (

          attendanceHistory.map((record,index)=>(

            <div key={index}>

              <h3>Date: {record.date}</h3>

              <table className="attendance-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>


                <tbody>

                {record.employees.map(
                  (employee:any, empIndex:number)=>(

                  <tr key={empIndex}>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>

                    <td>
                      {employee.status}
                    </td>

                  </tr>

                ))}

                </tbody>

              </table>

            </div>

          ))

        )
      }


    </div>

  );

}


export default Attendance;