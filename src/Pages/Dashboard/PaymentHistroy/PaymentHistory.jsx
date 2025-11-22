import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
  });
  //   console.log(paymentHistory);

  return (
    <div>
      PaymentHistory{paymentHistory.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>sL no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((pay, index) => (
              <tr key={pay._id}>
                <th>{index + 1}</th>
                <td>{pay.parcelName}</td>
                <td>{pay.customElements}</td>
                <td>{pay.amount}</td>
                <td className="btn btn-sm">view</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
