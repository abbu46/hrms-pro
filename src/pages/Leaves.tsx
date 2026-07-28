import { useState } from "react";

function Leaves() {
  const [leaves, setLeaves] = useState([
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
  ]);

  const [name, setName] = useState("");
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [days, setDays] = useState("");
  const [reason, setReason] = useState("");

  const addLeave = () => {
    if (!name || !days || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newLeave = {
      name,
      leaveType,
      days: Number(days),
      reason,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);

    setName("");
    setDays("");
    setReason("");
  };


  const updateStatus = (index: number, status: string) => {
    const updatedLeaves = leaves.map((leave, i) =>
      i === index ? { ...leave, status } : leave
    );

    setLeaves(updatedLeaves);
  };


  const deleteLeave = (index: number) => {
    const updatedLeaves = leaves.filter((_, i) => i !== index);
    setLeaves(updatedLeaves);
  };


  const pendingCount = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approvedCount = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejectedCount = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;


  return (
    <div>

      <h1>Leaves</h1>

      <h3>
        Pending: {pendingCount} | Approved: {approvedCount} | Rejected: {rejectedCount}
      </h3>


      <h2>Apply Leave</h2>

      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
      >
        <option>Sick Leave</option>
        <option>Casual Leave</option>
        <option>Annual Leave</option>
      </select>


      <input
        type="number"
        placeholder="Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />


      <input
        type="text"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />


      <button onClick={addLeave}>
        Apply
      </button>


      <hr />


      <table border={1}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>

          {leaves.map((leave, index) => (

            <tr key={index}>

              <td>{leave.name}</td>

              <td>{leave.leaveType}</td>

              <td>{leave.days}</td>

              <td>{leave.reason}</td>

              <td>{leave.status}</td>


              <td>

                <button
                  onClick={() =>
                    updateStatus(index, "Approved")
                  }
                >
                  Approve
                </button>


                <button
                  onClick={() =>
                    updateStatus(index, "Rejected")
                  }
                >
                  Reject
                </button>


                <button
                  onClick={() =>
                    deleteLeave(index)
                  }
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

export default Leaves;