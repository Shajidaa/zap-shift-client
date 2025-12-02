import React from "react";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });
  return (
    <div>
      Assign Riders:{parcels.length}{" "}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Cost</th>
              <th>District</th>

              <th>CreatedAt</th>
              <th>Delivery Status </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.senderDistrict}</td>

                <td>{parcel.createdAt}</td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn">Assign Rider</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRiders;
