import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";


type Attendance = {
  name: string;
  department: string;
  status: string;
};


type AttendanceRecord = {
  date: string;
  employees: Attendance[];
};


type AttendanceContextType = {
  attendance: Attendance[];
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;

  attendanceHistory: AttendanceRecord[];
  setAttendanceHistory: React.Dispatch<
    React.SetStateAction<AttendanceRecord[]>
  >;
};


export const AttendanceContext =
  createContext<AttendanceContextType | null>(null);



function AttendanceProvider({ children }: { children: ReactNode }) {


  const employeeContext = useContext(EmployeeContext);



  const [attendance, setAttendance] = useState<Attendance[]>(() => {

    const savedAttendance = localStorage.getItem("attendance");

    return savedAttendance
      ? JSON.parse(savedAttendance)
      : [];

  });



  const [attendanceHistory, setAttendanceHistory] = useState<
    AttendanceRecord[]
  >(() => {

    const savedHistory = localStorage.getItem(
      "attendanceHistory"
    );


    return savedHistory
      ? JSON.parse(savedHistory)
      : [];

  });




  useEffect(() => {

    if (employeeContext) {


      const updatedAttendance =
        employeeContext.employees.map((employee) => {


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





  useEffect(() => {

    localStorage.setItem(
      "attendanceHistory",
      JSON.stringify(attendanceHistory)
    );


  }, [attendanceHistory]);





  return (

    <AttendanceContext.Provider
      value={{
        attendance,
        setAttendance,

        attendanceHistory,
        setAttendanceHistory,
      }}
    >

      {children}

    </AttendanceContext.Provider>

  );

}


export default AttendanceProvider;