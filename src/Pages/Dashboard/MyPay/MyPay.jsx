import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyPay = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading''''''''''''</p>;
  }
  return (
    <div>
      pay <p>{parcel?.parcelName}</p>
    </div>
  );
};

export default MyPay;
