import { useState, useContext } from "react";
import { LeaveContext } from "../context/LeaveContext";
import { EmployeeContext } from "../context/EmployeeContext";


function Leaves() {


  const leaveContext = useContext(LeaveContext);

  const employeeContext = useContext(EmployeeContext);



  const [name, setName] = useState("");

  const [leaveType, setLeaveType] =
    useState("Sick Leave");

  const [days, setDays] = useState("");

  const [reason, setReason] = useState("");





  if (!leaveContext) {

    return <h2>Leave Context not found</h2>;

  }



  if (!employeeContext) {

    return <h2>Employee Context not found</h2>;

  }





  const {

    leaves,

    addLeave,

    updateLeaveStatus,

    deleteLeave

  } = leaveContext;




  const { employees } =
    employeeContext;






  const handleAddLeave = async () => {


    if (!name || !days || !reason) {

      alert("Please fill all fields");

      return;

    }




    await addLeave({

      name,

      leaveType,

      days:Number(days),

      reason,

      status:"Pending"

    });




    setName("");

    setDays("");

    setReason("");

  };







  const pendingCount =
    leaves.filter(
      leave =>
      leave.status === "Pending"
    ).length;




  const approvedCount =
    leaves.filter(
      leave =>
      leave.status === "Approved"
    ).length;




  const rejectedCount =
    leaves.filter(
      leave =>
      leave.status === "Rejected"
    ).length;







  return (

    <div className="leaves-page">



      <h1>
        Leaves
      </h1>






      <div className="leave-cards">


        <div className="card pending-card">

          <h3>
            Pending
          </h3>

          <h2>
            {pendingCount}
          </h2>

        </div>





        <div className="card approved-card">

          <h3>
            Approved
          </h3>

          <h2>
            {approvedCount}
          </h2>

        </div>





        <div className="card rejected-card">

          <h3>
            Rejected
          </h3>

          <h2>
            {rejectedCount}
          </h2>

        </div>



      </div>








      <div className="leave-form-card">


        <h2>
          Apply Leave
        </h2>





        <select

          value={name}

          onChange={
            e=>setName(e.target.value)
          }

        >


          <option value="">
            Select Employee
          </option>



          {
            employees.map(
              employee=>(

                <option

                  key={employee.name}

                  value={employee.name}

                >

                  {employee.name}

                </option>

              )
            )
          }


        </select>







        <select

          value={leaveType}

          onChange={
            e=>setLeaveType(e.target.value)
          }

        >

          <option>
            Sick Leave
          </option>


          <option>
            Casual Leave
          </option>


          <option>
            Annual Leave
          </option>


        </select>






        <input

          type="number"

          placeholder="Days"

          value={days}

          onChange={
            e=>setDays(e.target.value)
          }

        />






        <input

          type="text"

          placeholder="Reason"

          value={reason}

          onChange={
            e=>setReason(e.target.value)
          }

        />





        <button

          onClick={handleAddLeave}

        >

          Apply

        </button>



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
              Leave Type
            </th>


            <th>
              Days
            </th>


            <th>
              Reason
            </th>


            <th>
              Status
            </th>


            <th>
              Actions
            </th>


          </tr>


        </thead>






        <tbody>


        {
          leaves.map(
            leave=>(


            <tr key={leave._id}>


              <td>
                {leave.name}
              </td>



              <td>
                {leave.leaveType}
              </td>



              <td>
                {leave.days}
              </td>



              <td>
                {leave.reason}
              </td>



              <td>
                {leave.status}
              </td>





              <td>


                <button

                  onClick={()=>
                    updateLeaveStatus(
                      leave._id!,
                      "Approved"
                    )
                  }

                >

                  Approve

                </button>





                <button

                  onClick={()=>
                    updateLeaveStatus(
                      leave._id!,
                      "Rejected"
                    )
                  }

                >

                  Reject

                </button>






                <button

                  onClick={()=>
                    deleteLeave(
                      leave._id!
                    )
                  }

                >

                  Delete

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



export default Leaves;