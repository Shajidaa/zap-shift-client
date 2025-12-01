import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
// import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";

const BeRider = () => {
  const { register, watch, handleSubmit } = useForm();
  const serviceCenter = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  //   const navigate = useNavigate();
  const regionDuplicate = serviceCenter.map((c) => c.region);
  const region = [...new Set(regionDuplicate)];

  const riderRegion = watch("region");
  //   const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };

  const handleRider = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title:
            "Your application has been submitted . We will reach to you in 2 days ",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  return (
    <div>
      {" "}
      <h2 className="text-5xl font-bold my-10">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRider)}>
        <fieldset className="fieldset">
          <h3 className="text-lg font-semibold my-3">Rider Details</h3>
          <label className="label">Your Name </label>
          <input
            type="text"
            {...register("riderName")}
            className="input"
            placeholder="Rider Name"
            defaultValue={user?.displayName}
          />
          <label className="label">Your Email </label>
          <input
            type="email"
            {...register("riderEmail")}
            className="input"
            placeholder="Rider Email"
            defaultValue={user?.email}
          />
          {/* region */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Region </legend>
            <select
              {...register("region", { required: true })}
              defaultValue="Pick a region"
              className="select"
            >
              <option disabled={true}>Pick a region</option>
              {region.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          {/* District */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">District </legend>
            <select
              {...register("district", { required: true })}
              defaultValue="Pick a District"
              className="select"
            >
              <option disabled={true}>Pick a District</option>
              {districtByRegion(riderRegion).map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
          <label className="label"> Address </label>
          <input
            type="text"
            {...register("address", { required: true })}
            className="input"
            placeholder="Address"
          />

          <label className="label"> Driving License </label>
          <input
            type="text"
            {...register("license", { required: true })}
            className="input"
            placeholder="Driving License"
          />
          <label className="label"> NID </label>
          <input
            type="text"
            {...register("nid", { required: true })}
            className="input"
            placeholder="NID"
          />
          <label className="label">Bike</label>
          <input
            type="text"
            {...register("bike", { required: true })}
            className="input"
            placeholder="bike"
          />
        </fieldset>

        <input type="submit" className="btn btn-outline" />
      </form>
    </div>
  );
};

export default BeRider;
