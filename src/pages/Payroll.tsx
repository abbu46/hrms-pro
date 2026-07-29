import { useState, useContext, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { jsPDF } from "jspdf";


type PayrollData = {
  name: string;
  basicSalary: number;
  allowance: number;
  deduction: number;
};



function Payroll() {


  const context = useContext(EmployeeContext);



  const [payroll, setPayroll] = useState<PayrollData[]>(() => {

    const savedPayroll = localStorage.getItem("payroll");


    return savedPayroll
      ? JSON.parse(savedPayroll)
      : [
          {
            name: "Abrar Abdul",
            basicSalary: 3000,
            allowance: 500,
            deduction: 200,
          },
          {
            name: "John Smith",
            basicSalary: 4000,
            allowance: 600,
            deduction: 300,
          },
        ];

  });




  const [name, setName] = useState("");

  const [basicSalary, setBasicSalary] = useState("");

  const [allowance, setAllowance] = useState("");

  const [deduction, setDeduction] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);





  useEffect(() => {

    localStorage.setItem(
      "payroll",
      JSON.stringify(payroll)
    );

  }, [payroll]);





  if (!context) {

    return <h2>Context not found</h2>;

  }




  const { employees } = context;






  const addPayroll = () => {


    if (!name || !basicSalary) {

      alert("Please enter employee name and salary");

      return;

    }



    const newPayroll = {

      name,

      basicSalary: Number(basicSalary),

      allowance: Number(allowance),

      deduction: Number(deduction),

    };





    if (editIndex !== null) {


      const updatedPayroll = [...payroll];


      updatedPayroll[editIndex] = newPayroll;


      setPayroll(updatedPayroll);


      setEditIndex(null);


    } else {


      setPayroll([
        ...payroll,
        newPayroll
      ]);

    }





    setName("");

    setBasicSalary("");

    setAllowance("");

    setDeduction("");

  };







  const editPayroll = (index:number) => {


    const employee = payroll[index];


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


    setEditIndex(index);


  };







  const deletePayroll = (index:number) => {


    const updatedPayroll = payroll.filter(
      (_,i)=>i !== index
    );


    setPayroll(updatedPayroll);


  };








  const calculateNetSalary = (
    basicSalary:number,
    allowance:number,
    deduction:number
  ) => {


    return basicSalary + allowance - deduction;


  };








  const downloadSalarySlip = (
    employee:PayrollData
  ) => {


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


    doc.setFontSize(14);


    doc.text(
      `Net Salary: $${netSalary}`,
      20,
      120
    );



    doc.setFontSize(10);


    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      20,
      140
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

          {editIndex !== null
            ? "Update Payroll"
            : "Add Payroll"}

        </h2>





        <select

          value={name}

          onChange={(e)=>setName(e.target.value)}

        >

          <option value="">
            Select Employee
          </option>



          {
            employees.map(
              (employee,index)=>(

              <option
                key={index}
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

          onChange={(e)=>
            setBasicSalary(e.target.value)
          }

        />





        <input

          type="number"

          placeholder="Allowance"

          value={allowance}

          onChange={(e)=>
            setAllowance(e.target.value)
          }

        />





        <input

          type="number"

          placeholder="Deduction"

          value={deduction}

          onChange={(e)=>
            setDeduction(e.target.value)
          }

        />





        <button onClick={addPayroll}>

          {
            editIndex !== null
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
            (employee,index)=>(


            <tr key={index}>


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
                    editPayroll(index)
                  }
                >
                  Edit
                </button>




                <button
                  onClick={()=>
                    deletePayroll(index)
                  }
                >
                  Delete
                </button>




                <button
                  onClick={()=>
                    downloadSalarySlip(employee)
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