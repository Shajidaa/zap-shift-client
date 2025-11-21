import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

const MyParcels = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  return <div>this is my parcels:{parcels.length}</div>;
};

export default MyParcels;
