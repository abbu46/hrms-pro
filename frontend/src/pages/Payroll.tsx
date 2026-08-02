import { useState, useContext, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { jsPDF } from "jspdf";


type PayrollData = {

  _id?: string;

  name: string;

  basicSalary: number;

  allowance: number;

  deduction: number;

  netSalary?: number;

};




function Payroll() {


  const context = useContext(EmployeeContext);



  if (!context) {

    return <h2>Context not found</h2>;

  }



  const { employees } = context;





  const [payroll, setPayroll] =
    useState<PayrollData[]>([]);




  const [name, setName] =
    useState("");

  const [basicSalary, setBasicSalary] =
    useState("");

  const [allowance, setAllowance] =
    useState("");

  const [deduction, setDeduction] =
    useState("");

  const [editId, setEditId] =
    useState<string | null>(null);







  // Load payroll from MongoDB

  useEffect(() => {


    const fetchPayroll = async()=>{


      try{


        const response = await fetch(
          "http://localhost:5000/api/payroll"
        );


        const data =
          await response.json();


        setPayroll(data);



      }catch(error){


        console.log(
          "Payroll loading error",
          error
        );


      }


    };



    fetchPayroll();



  }, []);









  const calculateNetSalary = (
    basic:number,
    allowance:number,
    deduction:number
  ) => {


    return basic + allowance - deduction;


  };









  const addPayroll = async()=>{


    if(!name || !basicSalary){


      alert(
        "Please enter employee name and salary"
      );


      return;


    }




    const payrollData = {


      name,

      basicSalary:Number(basicSalary),

      allowance:Number(allowance),

      deduction:Number(deduction)


    };






    try{



      if(editId){


        await fetch(

          `http://localhost:5000/api/payroll/${editId}`,

          {

            method:"PUT",

            headers:{

              "Content-Type":
              "application/json"

            },

            body:
            JSON.stringify(payrollData)

          }

        );



      }

      else{


        await fetch(

          "http://localhost:5000/api/payroll",

          {

            method:"POST",

            headers:{

              "Content-Type":
              "application/json"

            },

            body:
            JSON.stringify(payrollData)

          }

        );


      }






      const response =
        await fetch(
          "http://localhost:5000/api/payroll"
        );



      const updated =
        await response.json();



      setPayroll(updated);





      setName("");

      setBasicSalary("");

      setAllowance("");

      setDeduction("");

      setEditId(null);




    }catch(error){


      console.log(
        "Payroll save error",
        error
      );


    }


  };









  const editPayroll = (
    employee:PayrollData
  )=>{


    setName(employee.name);


    setBasicSalary(
      employee.basicSalary.toString()
    );


    setAllowance(
      employee.allowance.toString()
    );


    setDeduction(
      employee.deduction.toString()
    );


    setEditId(
      employee._id || null
    );


  };









  const deletePayroll = async(
    id?:string
  )=>{


    if(!id) return;



    await fetch(

      `http://localhost:5000/api/payroll/${id}`,

      {

        method:"DELETE"

      }

    );



    setPayroll(
      payroll.filter(
        employee =>
        employee._id !== id
      )
    );


  };









  const downloadSalarySlip = (
    employee:PayrollData
  )=>{


    const doc = new jsPDF();



    const netSalary =
      calculateNetSalary(

        employee.basicSalary,

        employee.allowance,

        employee.deduction

      );



    doc.setFontSize(20);

    doc.text(
      "HRMS Pro",
      20,
      20
    );



    doc.setFontSize(16);

    doc.text(
      "Salary Slip",
      20,
      35
    );



    doc.setFontSize(12);


    doc.text(
      `Employee Name: ${employee.name}`,
      20,
      55
    );


    doc.text(
      `Basic Salary: $${employee.basicSalary}`,
      20,
      70
    );


    doc.text(
      `Allowance: $${employee.allowance}`,
      20,
      85
    );


    doc.text(
      `Deduction: $${employee.deduction}`,
      20,
      100
    );


    doc.text(
      `Net Salary: $${netSalary}`,
      20,
      120
    );



    doc.save(
      `${employee.name}-SalarySlip.pdf`
    );


  };








  return (

    <div className="payroll-page">


      <h1>
        Payroll Management
      </h1>





      <div className="payroll-form-card">


        <h2>
          {
            editId
            ? "Update Payroll"
            : "Add Payroll"
          }
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

            ))
          }


        </select>





        <input

          type="number"

          placeholder="Basic Salary"

          value={basicSalary}

          onChange={
            e=>setBasicSalary(e.target.value)
          }

        />





        <input

          type="number"

          placeholder="Allowance"

          value={allowance}

          onChange={
            e=>setAllowance(e.target.value)
          }

        />





        <input

          type="number"

          placeholder="Deduction"

          value={deduction}

          onChange={
            e=>setDeduction(e.target.value)
          }

        />





        <button onClick={addPayroll}>

          {
            editId
            ? "Update Payroll"
            : "Add Payroll"
          }

        </button>



      </div>








      <table>


        <thead>

          <tr>

            <th>Name</th>

            <th>Basic Salary</th>

            <th>Allowance</th>

            <th>Deduction</th>

            <th>Net Salary</th>

            <th>Action</th>

          </tr>


        </thead>





        <tbody>


        {
          payroll.map(
            employee=>(


            <tr key={employee._id}>


              <td>
                {employee.name}
              </td>


              <td>
                ${employee.basicSalary}
              </td>


              <td>
                ${employee.allowance}
              </td>


              <td>
                ${employee.deduction}
              </td>


              <td>

                $
                {
                  employee.netSalary ??
                  calculateNetSalary(
                    employee.basicSalary,
                    employee.allowance,
                    employee.deduction
                  )
                }

              </td>




              <td>


                <button

                  onClick={()=>
                    editPayroll(employee)
                  }

                >

                  Edit

                </button>





                <button

                  onClick={()=>
                    deletePayroll(
                      employee._id
                    )
                  }

                >

                  Delete

                </button>





                <button

                  onClick={()=>
                    downloadSalarySlip(
                      employee
                    )
                  }

                >

                  Download Salary Slip

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



export default Payroll;