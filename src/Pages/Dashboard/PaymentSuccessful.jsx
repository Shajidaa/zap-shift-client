import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const PaymentSuccessful = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  console.log(paymentInfo);

  return (
    <div>
      <p className="text-5xl">Payment Successful</p>
      <p>Your trackingId : {paymentInfo.trackingId}</p>
      <p>Your transactionId : {paymentInfo.transactionId}</p>
    </div>
  );
};

export default PaymentSuccessful;
