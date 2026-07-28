import { useState, useContext, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";


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


      setPayroll([...payroll, newPayroll]);


    }




    setName("");

    setBasicSalary("");

    setAllowance("");

    setDeduction("");

  };





  const editPayroll = (index:number) => {


    const employee = payroll[index];


    setName(employee.name);

    setBasicSalary(employee.basicSalary.toString());

    setAllowance(employee.allowance.toString());

    setDeduction(employee.deduction.toString());


    setEditIndex(index);

  };





  const deletePayroll = (index:number) => {


    const updatedPayroll = payroll.filter(
      (_, i) => i !== index
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





  return (

    <div>


      <h1>Payroll Management</h1>


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


        {employees.map((employee,index)=>(

          <option
            key={index}
            value={employee.name}
          >

            {employee.name}

          </option>

        ))}


      </select>



      <br/><br/>



      <input
        type="number"
        placeholder="Basic Salary"
        value={basicSalary}
        onChange={(e)=>setBasicSalary(e.target.value)}
      />



      <br/><br/>



      <input
        type="number"
        placeholder="Allowance"
        value={allowance}
        onChange={(e)=>setAllowance(e.target.value)}
      />



      <br/><br/>



      <input
        type="number"
        placeholder="Deduction"
        value={deduction}
        onChange={(e)=>setDeduction(e.target.value)}
      />



      <br/><br/>



      <button onClick={addPayroll}>

        {editIndex !== null
          ? "Update Payroll"
          : "Add Payroll"}

      </button>




      <hr/>





      <table border={1} cellPadding={10}>


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


        {payroll.map((employee,index)=>(


          <tr key={index}>


            <td>{employee.name}</td>


            <td>${employee.basicSalary}</td>


            <td>${employee.allowance}</td>


            <td>${employee.deduction}</td>


            <td>
              $
              {calculateNetSalary(
                employee.basicSalary,
                employee.allowance,
                employee.deduction
              )}
            </td>



            <td>

              <button
                onClick={()=>editPayroll(index)}
              >
                Edit
              </button>


              <button
                onClick={()=>deletePayroll(index)}
              >
                Delete
              </button>


            </td>


          </tr>


        ))}


        </tbody>


      </table>


    </div>

  );

}


export default Payroll;