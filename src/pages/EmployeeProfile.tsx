import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { AttendanceContext } from "../context/AttendanceContext";
import { LeaveContext } from "../context/LeaveContext";


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



  const { attendanceHistory } = attendanceContext;



  const employeeAttendance =
    attendanceHistory.flatMap((record) =>
      record.employees.filter(
        (employeeRecord) =>
          employeeRecord.name === employee.name
      )
    );





  const presentDays = employeeAttendance.filter(
    (record) =>
      record.status === "Present"
  ).length;




  const absentDays = employeeAttendance.filter(
    (record) =>
      record.status === "Absent"
  ).length;




  const totalDays = employeeAttendance.length;




  const attendancePercentage =
    totalDays > 0
      ? ((presentDays / totalDays) * 100).toFixed(2)
      : 0;







  const payrollData: PayrollData[] = JSON.parse(
    localStorage.getItem("payroll") || "[]"
  );




  const salary = payrollData.find(
    (payroll) =>
      payroll.name === employee.name
  );




  const netSalary = salary
    ? salary.basicSalary +
      salary.allowance -
      salary.deduction
    : 0;







  const leaveContext = useContext(LeaveContext);



  if (!leaveContext) {
    return <h2>Leave Context not found</h2>;
  }



  const { leaves } = leaveContext;




  const employeeLeaves = leaves.filter(
    (leave) =>
      leave.name === employee.name &&
      leave.status === "Approved"
  );





  const sickLeaveUsed = employeeLeaves
    .filter(
      (leave) =>
        leave.leaveType === "Sick Leave"
    )
    .reduce(
      (total, leave) =>
        total + leave.days,
      0
    );





  const casualLeaveUsed = employeeLeaves
    .filter(
      (leave) =>
        leave.leaveType === "Casual Leave"
    )
    .reduce(
      (total, leave) =>
        total + leave.days,
      0
    );





  const annualLeaveUsed = employeeLeaves
    .filter(
      (leave) =>
        leave.leaveType === "Annual Leave"
    )
    .reduce(
      (total, leave) =>
        total + leave.days,
      0
    );





  return (

    <div>


      <h1>
        Employee Profile
      </h1>





      <div
        style={{
          width: "450px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >





        <h2>
          {employee.name}
        </h2>



        <hr />



        <p>
          <strong>Department:</strong>{" "}
          {employee.department}
        </p>



        <p>
          <strong>Position:</strong>{" "}
          {employee.position}
        </p>



        <p>

          <strong>Status:</strong>{" "}

          <span
            style={{
              color:
                employee.status === "Active"
                  ? "green"
                  : "red",
              fontWeight: "bold"
            }}
          >

            {employee.status}

          </span>

        </p>







        <hr />



        <h3>
          Salary Details
        </h3>




        {salary ? (

          <>

            <p>
              <strong>Basic Salary:</strong>{" "}
              ${salary.basicSalary}
            </p>


            <p>
              <strong>Allowance:</strong>{" "}
              ${salary.allowance}
            </p>


            <p>
              <strong>Deduction:</strong>{" "}
              ${salary.deduction}
            </p>


            <p>
              <strong>Net Salary:</strong>{" "}
              ${netSalary}
            </p>


          </>


        ) : (

          <p>
            Salary details not available.
          </p>

        )}








        <hr />



        <h3>
          Attendance Summary
        </h3>



        <p>
          <strong>Total Days:</strong>{" "}
          {totalDays}
        </p>



        <p style={{color:"green"}}>
          <strong>Present Days:</strong>{" "}
          {presentDays}
        </p>



        <p style={{color:"red"}}>
          <strong>Absent Days:</strong>{" "}
          {absentDays}
        </p>



        <p>
          <strong>
            Attendance Percentage:
          </strong>{" "}
          {attendancePercentage}%
        </p>








        <hr />



        <h3>
          Leave Summary
        </h3>



        <p>
          <strong>Sick Leave:</strong>
          <br />
          Used: {sickLeaveUsed}
          <br />
          Remaining: {10 - sickLeaveUsed}
        </p>




        <p>
          <strong>Casual Leave:</strong>
          <br />
          Used: {casualLeaveUsed}
          <br />
          Remaining: {10 - casualLeaveUsed}
        </p>




        <p>
          <strong>Annual Leave:</strong>
          <br />
          Used: {annualLeaveUsed}
          <br />
          Remaining: {15 - annualLeaveUsed}
        </p>




      </div>



    </div>

  );

}



export default EmployeeProfile;