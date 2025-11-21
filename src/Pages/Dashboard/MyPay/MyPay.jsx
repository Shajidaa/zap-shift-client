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

  const handlePay = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
  };
  return (
    <div>
      <p>
        The bill is {parcel.cost} for {parcel?.parcelName}{" "}
      </p>
      <button onClick={handlePay} className="btn btn-sm">
        Pay
      </button>
    </div>
  );
};

export default MyPay;
