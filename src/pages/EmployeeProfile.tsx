import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { AttendanceContext } from "../context/AttendanceContext";


type PayrollData = {
  name: string;
  basicSalary: number;
  allowance: number;
  deduction: number;
};



function EmployeeProfile() {


  const { id } = useParams();


  const employeeContext = useContext(EmployeeContext);


  if (!employeeContext) {
    return <h2>Employee Context not found</h2>;
  }


  const { employees } = employeeContext;


  const employee = employees[Number(id)];



  if (!employee) {

    return (
      <div>
        <h2>Employee not found</h2>
      </div>
    );

  }



  const attendanceContext = useContext(AttendanceContext);


  if (!attendanceContext) {
    return <h2>Attendance Context not found</h2>;
  }


  const { attendance } = attendanceContext;



  const employeeAttendance = attendance.filter(
    (record) => record.name === employee.name
  );



  const presentDays = employeeAttendance.filter(
    (record) => record.status === "Present"
  ).length;



  const absentDays = employeeAttendance.filter(
    (record) => record.status === "Absent"
  ).length;



  const payrollData: PayrollData[] = JSON.parse(
    localStorage.getItem("payroll") || "[]"
  );



  const salary = payrollData.find(
    (payroll) => payroll.name === employee.name
  );



  const netSalary = salary
    ? salary.basicSalary + salary.allowance - salary.deduction
    : 0;



  return (

    <div>


      <h1>Employee Profile</h1>



      <div
        style={{
          width: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >


        <h2>{employee.name}</h2>


        <hr />


        <p>
          <strong>Department:</strong> {employee.department}
        </p>


        <p>
          <strong>Position:</strong> {employee.position}
        </p>


        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: employee.status === "Active"
                ? "green"
                : "red",
              fontWeight: "bold"
            }}
          >
            {employee.status}
          </span>
        </p>



        <hr />


        <h3>Salary Details</h3>


        {salary ? (

          <>

            <p>
              <strong>Basic Salary:</strong> ${salary.basicSalary}
            </p>


            <p>
              <strong>Allowance:</strong> ${salary.allowance}
            </p>


            <p>
              <strong>Deduction:</strong> ${salary.deduction}
            </p>


            <p>
              <strong>Net Salary:</strong> ${netSalary}
            </p>


          </>


        ) : (

          <p>
            Salary details not available.
          </p>

        )}



        <hr />



        <h3>Attendance Summary</h3>


        <p>
          <strong>Total Records:</strong> {employeeAttendance.length}
        </p>


        <p style={{color:"green"}}>
          <strong>Present Days:</strong> {presentDays}
        </p>


        <p style={{color:"red"}}>
          <strong>Absent Days:</strong> {absentDays}
        </p>



      </div>


    </div>

  );

}


export default EmployeeProfile;