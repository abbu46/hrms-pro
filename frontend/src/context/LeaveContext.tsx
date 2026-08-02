import {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";


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





  // Get leaves from MongoDB

  useEffect(() => {


    const fetchLeaves = async () => {


      try {


        const response = await fetch(
          "http://localhost:5000/api/leaves"
        );


        const data =
          await response.json();


        setLeaves(data);



      } catch(error) {


        console.log(
          "Loading leaves error",
          error
        );


      }


    };



    fetchLeaves();



  }, []);







  const addLeave = async (
    leave: Leave
  ) => {


    try {


      const response = await fetch(
        "http://localhost:5000/api/leaves",
        {

          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify(leave)

        }
      );



      const data =
        await response.json();



      setLeaves([
        ...leaves,
        data
      ]);



    } catch(error) {


      console.log(
        "Add leave error",
        error
      );


    }


  };







  const updateLeaveStatus =
    async (
      id:string,
      status:string
    ) => {


      try {


        const response =
          await fetch(

            `http://localhost:5000/api/leaves/${id}`,

            {

              method:"PUT",

              headers:{
                "Content-Type":
                "application/json"
              },

              body:JSON.stringify({
                status
              })

            }

          );



        const updated =
          await response.json();



        setLeaves(
          leaves.map(
            leave =>
            leave._id === id
            ? updated
            : leave
          )
        );



      } catch(error) {


        console.log(
          "Update leave error",
          error
        );


      }


    };







  const deleteLeave =
    async(id:string)=>{


      try{


        await fetch(

          `http://localhost:5000/api/leaves/${id}`,

          {
            method:"DELETE"
          }

        );



        setLeaves(
          leaves.filter(
            leave =>
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