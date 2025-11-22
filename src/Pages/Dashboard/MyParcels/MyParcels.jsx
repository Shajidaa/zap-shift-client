import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.assign(res.data.url);
  };
  return (
    <div>
      this is my parcels:{parcels.length}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                {/* <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="btn btn-square btn-sm bg-green-600">
                      Paid
                    </span>
                  ) : (
                    <Link
                      to={`/dashboard/parcel/${parcel._id}`}
                      className="btn btn-square btn-sm"
                    >
                      Pay
                    </Link>
                  )}
                </td> */}
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="btn btn-square btn-sm bg-green-600">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-square btn-sm"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn mx-2 btn-square">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square"
                  >
                    <MdDelete />
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

export default MyParcels;
