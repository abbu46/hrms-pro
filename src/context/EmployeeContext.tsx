import { createContext, useState, ReactNode } from "react";
import {useEffect} from "react";

type Employee = {
  name: string;
  department: string;
  position: string;
  status: string;
};


type EmployeeContextType = {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};


export const EmployeeContext = createContext<EmployeeContextType | null>(null);


function EmployeeProvider({ children }: { children: ReactNode }) {

  const [employees, setEmployees] = useState<Employee[]>(() => {
  const savedEmployees = localStorage.getItem("employees");

  return savedEmployees
    ? JSON.parse(savedEmployees)
    : [
        {
          name: "Abrar Abdul",
          department: "IT",
          position: "Front-end Developer",
          status: "Active",
        },
        {
          name: "John Smith",
          department: "HR",
          position: "HR Manager",
          status: "Active",
        },
      ];
});
  useEffect(()=> {
       localStorage.setItem(
      "employees", 
      JSON.stringify(employees)
    );
    
  }, [employees]);



  return (
    <EmployeeContext.Provider
      value={{ employees, setEmployees }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}


export default EmployeeProvider;