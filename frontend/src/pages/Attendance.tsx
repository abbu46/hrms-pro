import { useState, useContext } from "react";
import { AttendanceContext } from "../context/AttendanceContext";


function Attendance() {


  const context = useContext(AttendanceContext);


  if (!context) {

    return <h2>Attendance Context not found</h2>;

  }



  const {
    attendance,
    setAttendance,
    saveAttendance
  } = context;



  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );





  const updateStatus = (
    index:number,
    status:string
  ) => {


    const updatedAttendance =
      [...attendance];


    updatedAttendance[index].status =
      status;


    setAttendance(updatedAttendance);


  };







  const presentCount =
    attendance.filter(
      employee =>
        employee.status === "Present"
    ).length;





  const absentCount =
    attendance.filter(
      employee =>
        employee.status === "Absent"
    ).length;






  return (

    <div className="attendance-page">


      <h1>
        Attendance Management
      </h1>





      <div className="attendance-header-card">


        <label>
          Select Date
        </label>


        <input

          type="date"

          value={date}

          onChange={(e)=>
            setDate(e.target.value)
          }

        />



        <p>
          Attendance Date:
          <strong>
            {date}
          </strong>
        </p>




        <button

          onClick={()=>
            saveAttendance(date)
          }

        >

          Save Attendance

        </button>


      </div>







      <div className="attendance-cards">



        <div className="card">

          <h3>
            Total Employees
          </h3>

          <h2>
            {attendance.length}
          </h2>

        </div>





        <div className="card">

          <h3 style={{color:"green"}}>

            Present

          </h3>


          <h2>
            {presentCount}
          </h2>


        </div>






        <div className="card">


          <h3 style={{color:"red"}}>

            Absent

          </h3>


          <h2>

            {absentCount}

          </h2>


        </div>



      </div>







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
              Status
            </th>


            <th>
              Action
            </th>


          </tr>


        </thead>





        <tbody>



        {
          attendance.map(
            (employee,index)=>(


            <tr key={index}>


              <td>
                {employee.name}
              </td>



              <td>
                {employee.department}
              </td>




              <td

              style={{

                color:
                employee.status==="Present"
                ?"green"
                :"red",

                fontWeight:"bold"

              }}

              >

                {employee.status}

              </td>






              <td>


                <button

                onClick={()=>
                  updateStatus(
                    index,
                    "Present"
                  )
                }

                >

                  Present

                </button>





                <button

                onClick={()=>
                  updateStatus(
                    index,
                    "Absent"
                  )
                }

                >

                  Absent

                </button>


              </td>



            </tr>


          ))

        }



        </tbody>


      </table>





    </div>

  );


}


export default Attendance;