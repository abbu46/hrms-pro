import { createContext, useState, ReactNode, useEffect } from "react";

type Leave = {
  name: string;
  leaveType: string;
  days: number;
  reason: string;
  status: string;
};


type LeaveContextType = {
  leaves: Leave[];
  setLeaves: React.Dispatch<React.SetStateAction<Leave[]>>;
};


export const LeaveContext = createContext<LeaveContextType | null>(null);


function LeaveProvider({ children }: { children: ReactNode }) {

  const [leaves, setLeaves] = useState<Leave[]>(() => {

    const savedLeaves = localStorage.getItem("leaves");

    return savedLeaves
      ? JSON.parse(savedLeaves)
      : [
          {
            name: "Abrar Abdul",
            leaveType: "Sick Leave",
            days: 2,
            reason: "Fever",
            status: "Approved",
          },
          {
            name: "John Smith",
            leaveType: "Casual Leave",
            days: 3,
            reason: "Personal work",
            status: "Pending",
          },
        ];
  });


  useEffect(() => {
    localStorage.setItem(
      "leaves",
      JSON.stringify(leaves)
    );
  }, [leaves]);


  return (
    <LeaveContext.Provider
      value={{ leaves, setLeaves }}
    >
      {children}
    </LeaveContext.Provider>
  );
}


export default LeaveProvider;