import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";


type Attendance = {
  name: string;
  department: string;
  status: string;
};


type AttendanceContextType = {
  attendance: Attendance[];
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;
};


export const AttendanceContext = createContext<AttendanceContextType | null>(null);



function AttendanceProvider({ children }: { children: ReactNode }) {


  const employeeContext = useContext(EmployeeContext);


  const [attendance, setAttendance] = useState<Attendance[]>(() => {

    const savedAttendance = localStorage.getItem("attendance");

    return savedAttendance
      ? JSON.parse(savedAttendance)
      : [];

  });



  useEffect(() => {

    if (employeeContext) {

      const updatedAttendance = employeeContext.employees.map((employee) => {

        const existingEmployee = attendance.find(
          (item) => item.name === employee.name
        );


        return existingEmployee
          ? existingEmployee
          : {
              name: employee.name,
              department: employee.department,
              status: "Present",
            };

      });


      setAttendance(updatedAttendance);

    }

  }, [employeeContext?.employees]);




  useEffect(() => {

    localStorage.setItem(
      "attendance",
      JSON.stringify(attendance)
    );

  }, [attendance]);




  return (
    <AttendanceContext.Provider
      value={{ attendance, setAttendance }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}


export default AttendanceProvider;