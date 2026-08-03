import { createContext, useState,useEffect } from "react";

import type { ReactNode } from "react";


type Employee = {
  _id?: string;
  name: string;
  department: string;
  position: string;
  status: string;
  joiningDate?: string;
  email?: string;
};



type EmployeeContextType = {
  employees: Employee[];
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (id: string, employee: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
};



export const EmployeeContext =
  createContext<EmployeeContextType | null>(null);





function EmployeeProvider({ children }: { children: ReactNode }) {


  const [employees, setEmployees] =
    useState<Employee[]>([]);




  const API_URL =
    `${import.meta.env.VITE_API_URL}/employees`;






  const getAuthHeaders = () => {

    const token =
      localStorage.getItem("token");


    return {

      "Content-Type": "application/json",

      Authorization:
        `Bearer ${token}`,

    };

  };







  // Get employees
  const fetchEmployees = async () => {


    try {


      const response =
        await fetch(
          API_URL,
          {
            headers:
              getAuthHeaders(),
          }
        );



      const data =
        await response.json();



      setEmployees(
  Array.isArray(data)
    ? data
    : data.employees || []
);



    } catch(error) {


      console.log(
        "Error fetching employees",
        error
      );


    }


  };







  useEffect(() => {

    fetchEmployees();

  }, []);









  // Add employee

  const addEmployee = async (
    employee: Employee
  ) => {


    const response =
      await fetch(
        API_URL,
        {

          method:"POST",

          headers:
            getAuthHeaders(),

          body:
            JSON.stringify(employee),

        }
      );



    const newEmployee =
      await response.json();




    setEmployees((prev)=>
      [
        ...prev,
        newEmployee
      ]
    );


  };









  // Update employee

  const updateEmployee = async(
    id:string,
    employee:Employee
  ) => {


    const response =
      await fetch(
        `${API_URL}/${id}`,
        {

          method:"PUT",

          headers:
            getAuthHeaders(),

          body:
            JSON.stringify(employee),

        }
      );




    const updatedEmployee =
      await response.json();




    setEmployees((prev)=>

      prev.map((emp)=>

        emp._id === id
          ? updatedEmployee
          : emp

      )

    );


  };









  // Delete employee

  const deleteEmployee = async(
    id:string
  ) => {


    await fetch(
      `${API_URL}/${id}`,
      {

        method:"DELETE",

        headers:
          getAuthHeaders(),

      }
    );




    setEmployees((prev)=>

      prev.filter(
        (emp)=>
          emp._id !== id
      )

    );


  };








  return (

    <EmployeeContext.Provider

      value={{

        employees,

        addEmployee,

        updateEmployee,

        deleteEmployee,

      }}

    >

      {children}

    </EmployeeContext.Provider>

  );


}





export default EmployeeProvider;