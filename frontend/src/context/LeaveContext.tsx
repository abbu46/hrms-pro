import {
  createContext,
  useState,
  
  useEffect,
} from "react";

import type { ReactNode } from "react";


type Leave = {

  _id?: string;

  name: string;

  leaveType: string;

  days: number;

  reason: string;

  status: string;

};




type LeaveContextType = {

  leaves: Leave[];

  setLeaves: React.Dispatch<
    React.SetStateAction<Leave[]>
  >;

  addLeave: (
    leave: Leave
  ) => Promise<void>;

  updateLeaveStatus: (
    id: string,
    status: string
  ) => Promise<void>;

  deleteLeave: (
    id: string
  ) => Promise<void>;

};





export const LeaveContext =
  createContext<LeaveContextType | null>(null);







function LeaveProvider({
  children
}: {
  children: ReactNode
}) {



  const [leaves, setLeaves] =
    useState<Leave[]>([]);




  const API_URL =
    `${import.meta.env.VITE_API_URL}/leaves`;







  const getAuthHeaders = () => {

    return {

      "Content-Type": "application/json",

      Authorization:
        `Bearer ${localStorage.getItem("token")}`,

    };

  };








  // Get leaves

  useEffect(() => {


    const fetchLeaves = async () => {


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



        setLeaves(
          Array.isArray(data)
          ? data
          : data.leaves || []
        );



      } catch(error) {


        console.log(
          "Loading leaves error",
          error
        );


      }


    };



    fetchLeaves();



  }, []);









  // Add leave

  const addLeave = async(
    leave: Leave
  ) => {


    try {


      const response =
        await fetch(
          API_URL,
          {

            method:"POST",

            headers:
              getAuthHeaders(),

            body:
              JSON.stringify(leave)

          }
        );



      const data =
        await response.json();




      setLeaves((prev)=>[
        ...prev,
        data
      ]);



    }catch(error){


      console.log(
        "Add leave error",
        error
      );


    }


  };









  // Update leave status

  const updateLeaveStatus =
    async(
      id:string,
      status:string
    )=>{


      try{


        const response =
          await fetch(
            `${API_URL}/${id}`,
            {

              method:"PUT",

              headers:
                getAuthHeaders(),

              body:
                JSON.stringify({
                  status
                })

            }
          );



        const updated =
          await response.json();




        setLeaves((prev)=>

          prev.map(
            (leave)=>

            leave._id === id
            ? updated
            : leave

          )

        );



      }catch(error){


        console.log(
          "Update leave error",
          error
        );


      }


    };









  // Delete leave

  const deleteLeave =
    async(id:string)=>{


      try{


        await fetch(
          `${API_URL}/${id}`,
          {

            method:"DELETE",

            headers:
              getAuthHeaders(),

          }
        );



        setLeaves((prev)=>

          prev.filter(
            (leave)=>
              leave._id !== id
          )

        );



      }catch(error){


        console.log(
          "Delete leave error",
          error
        );


      }


    };








  return (

    <LeaveContext.Provider

      value={{

        leaves,

        setLeaves,

        addLeave,

        updateLeaveStatus,

        deleteLeave,

      }}

    >

      {children}

    </LeaveContext.Provider>

  );

}



export default LeaveProvider;