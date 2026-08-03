import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { LeaveContext } from "../context/LeaveContext";
import { AttendanceContext } from "../context/AttendanceContext";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "./DashboardLayout.css";


function DashboardLayout() {


  const employeeContext = useContext(EmployeeContext);

  if (!employeeContext) {
    return <h2>Employee Context not found</h2>;
  }


  const { employees } = employeeContext;




  const leaveContext = useContext(LeaveContext);

  if (!leaveContext) {
    return <h2>Leave Context not found</h2>;
  }


  const { leaves } = leaveContext;





  const attendanceContext = useContext(AttendanceContext);

  if (!attendanceContext) {
    return <h2>Attendance Context not found</h2>;
  }


  const { attendance } = attendanceContext;





  const presentToday = Array.isArray(attendance)
  ? attendance.filter(
      (employee) => employee.status === "Present"
    ).length
  : 0;


const absentToday = Array.isArray(attendance)
  ? attendance.filter(
      (employee) => employee.status === "Absent"
    ).length
  : 0;





  const pendingLeaves = leaves.filter(
    (leave) =>
      leave.status === "Pending"
  ).length;



  const approvedLeaves = leaves.filter(
    (leave) =>
      leave.status === "Approved"
  ).length;



  const rejectedLeaves = leaves.filter(
    (leave) =>
      leave.status === "Rejected"
  ).length;





  const activeEmployees = employees.filter(
    (employee) =>
      employee.status === "Active"
  ).length;






  const attendanceData = [

    {
      name: "Present",
      value: presentToday,
    },

    {
      name: "Absent",
      value: absentToday,
    },

  ];





  const leaveData = [

    {
      name: "Pending",
      value: pendingLeaves,
    },

    {
      name: "Approved",
      value: approvedLeaves,
    },

    {
      name: "Rejected",
      value: rejectedLeaves,
    },

  ];







  return (

    <div className="dashboard">



      <Sidebar />



      <div className="content">



        <Header />



        <main>



          <h1>
            Dashboard
          </h1>



          <p>
            Welcome to HRMS Pro dashboard.
          </p>





          <div className="cards">



            <div className="dashboard-card employee-card">

              <h3>
                Total Employees
              </h3>

              <p>
                {employees.length}
              </p>

            </div>





            <div className="dashboard-card active-card">

              <h3>
                Active Employees
              </h3>

              <p>
                {activeEmployees}
              </p>

            </div>





            <div className="dashboard-card present-card">

              <h3>
                Present Today
              </h3>

              <p>
                {presentToday}
              </p>

            </div>





            <div className="dashboard-card leave-card">

              <h3>
                Pending Leaves
              </h3>

              <p>
                {pendingLeaves}
              </p>

            </div>



          </div>







          <div
            style={{
              display:"flex",
              gap:"40px",
              marginTop:"40px"
            }}
          >





            <div>


              <h2>
                Attendance Overview
              </h2>




              <PieChart
                width={350}
                height={300}
              >


                <Pie

                  data={attendanceData}

                  dataKey="value"

                  nameKey="name"

                  cx="50%"

                  cy="50%"

                  outerRadius={100}

                  label

                >


                  {
                  attendanceData.map((_,index)=>(


                      <Cell

                        key={index}

                        fill={
                          index === 0
                          ? "#22c55e"
                          : "#ef4444"
                        }

                      />


                    )
                  )}



                </Pie>




                <Tooltip />

                <Legend />



              </PieChart>




            </div>









            <div>



              <h2>
                Leave Overview
              </h2>





              <BarChart

                width={400}

                height={300}

                data={leaveData}

              >


                <CartesianGrid />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />


                <Bar

                  dataKey="value"

                />



              </BarChart>



            </div>





          </div>









          <h2>
            Recent Employees
          </h2>






          <table
            border={1}
            cellPadding={10}
          >


            <thead>


              <tr>

                <th>
                  Name
                </th>


                <th>
                  Department
                </th>


                <th>
                  Position
                </th>


              </tr>


            </thead>





            <tbody>


              {
                employees.slice(-5).map(
                  (employee,index)=>(


                    <tr key={index}>


                      <td>
                        {employee.name}
                      </td>


                      <td>
                        {employee.department}
                      </td>


                      <td>
                        {employee.position}
                      </td>


                    </tr>


                  )
                )
              }



            </tbody>



          </table>






        </main>





      </div>





    </div>


  );

}


export default DashboardLayout;