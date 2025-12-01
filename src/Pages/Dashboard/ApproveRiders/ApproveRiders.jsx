import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders,pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateStatus(rider, "rejected");
  };

  return (
    <div>
      Riders Pending Approvals :{riders.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>sL no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "approved"
                        ? "text-green-600"
                        : " text-red-600"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-sm"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn btn-sm"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn btn-sm">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
