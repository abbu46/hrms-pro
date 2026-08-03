import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

import { EmployeeContext } from "./EmployeeContext";



type Attendance = {

  _id?: string;

  name: string;

  department: string;

  status: string;

  date?: string;

};





type AttendanceContextType = {

  attendance: Attendance[];

  setAttendance: React.Dispatch<
    React.SetStateAction<Attendance[]>
  >;

  saveAttendance: (
    date: string
  ) => Promise<void>;

};





export const AttendanceContext =
  createContext<AttendanceContextType | null>(null);








function AttendanceProvider({
  children
}: {
  children: ReactNode
}) {


  const employeeContext =
    useContext(EmployeeContext);



  const [attendance, setAttendance] =
    useState<Attendance[]>([]);




  const API_URL =
    `${import.meta.env.VITE_API_URL}/attendance`;







  const getAuthHeaders = () => {

    return {

      "Content-Type": "application/json",

      Authorization:
        `Bearer ${localStorage.getItem("token")}`,

    };

  };








  // Load attendance

  useEffect(() => {


    const loadAttendance = async () => {


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




        setAttendance(
          Array.isArray(data)
          ? data
          : data.attendance || []
        );



      } catch(error) {


        console.log(
          "Attendance loading error",
          error
        );


      }


    };



    loadAttendance();



  }, []);









  // Create default attendance from employees

  useEffect(() => {


    if(
      employeeContext &&
      attendance.length === 0
    ){


      const employees =
        employeeContext.employees.map(
          (employee)=>({

            name:
              employee.name,

            department:
              employee.department,

            status:
              "Present"

          })

        );



      setAttendance(employees);


    }


  },[
    employeeContext?.employees
  ]);









  // Save attendance

  const saveAttendance =
    async(date:string)=>{


      try{


        for(
          const employee of attendance
        ){


          await fetch(
            API_URL,
            {

              method:"POST",

              headers:
                getAuthHeaders(),

              body:
                JSON.stringify({

                  name:
                    employee.name,

                  department:
                    employee.department,

                  status:
                    employee.status,

                  date

                })

            }
          );


        }



        alert(
          "Attendance saved successfully!"
        );



      }catch(error){


        console.log(
          "Save attendance error",
          error
        );


      }


    };








  return (

    <AttendanceContext.Provider

      value={{

        attendance,

        setAttendance,

        saveAttendance,

      }}

    >

      {children}

    </AttendanceContext.Provider>

  );


}





export default AttendanceProvider;