import React, { use } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";

const SendParcel = () => {
  const { register, watch, control, handleSubmit } = useForm();
  const serviceCenter = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const regionDuplicate = serviceCenter.map((c) => c.region);
  const region = [...new Set(regionDuplicate)];

  const senderRegion = watch("senderRegion");
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };

  const handleParcelSubmit = (data) => {
    // console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    Swal.fire({
      title: "Agree with the Cost ?",
      text: `You will be charged ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        //send the data to mongodb

        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res);
        });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold my-10">Send a parcel</h2>
      <form onSubmit={handleSubmit(handleParcelSubmit)}>
        <div className="my-5">
          <h3 className="text-xl font-semibold my-3">
            Enter your parcel details
          </h3>
          <hr />
          <label className="label  mr-2">
            <input
              type="radio"
              value="document"
              className="radio"
              defaultChecked
              {...register("parcelType", { required: true })}
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              value="non-document"
              className="radio"
              {...register("parcelType", { required: true })}
            />
            Non-Document
          </label>
        </div>
        <div className="flex justify-between gap-8 ">
          <fieldset className="fieldset w-full ">
            <label className="label ">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="input w-full!  "
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset  w-full  ">
            <label className="label">Parcel Weight(kg)</label>
            <input
              type="text"
              {...register("parcelWeight", { required: true })}
              className="input w-full! "
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* sender Details */}

          <fieldset className="fieldset">
            <h3 className="text-lg font-semibold my-3">Sender Details</h3>
            <label className="label">Sender Name </label>
            <input
              type="text"
              {...register("senderName", { required: true })}
              className="input"
              placeholder="Sender Name"
              defaultValue={user?.displayName}
            />
            <label className="label">Sender Email </label>
            <input
              type="email"
              {...register("senderEmail", { required: true })}
              className="input"
              placeholder="Sender Email"
              defaultValue={user?.email}
            />
            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region </legend>
              <select
                {...register("senderRegion", { required: true })}
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
                {...register("senderDistrict", { required: true })}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            <label className="label"> Address </label>
            <input
              type="text"
              {...register("senderAddress", { required: true })}
              className="input"
              placeholder="Address"
            />
          </fieldset>

          {/* receiver details */}
          <fieldset className="fieldset">
            <h3 className="text-lg font-semibold my-3">Receiver Details</h3>
            <label className="label">Receiver Name </label>
            <input
              type="text"
              {...register("receiverName", { required: true })}
              className="input"
              placeholder="Receiver Name"
            />
            <label className="label">Receiver Email </label>
            <input
              type="email"
              {...register("receiverEmail", { required: true })}
              className="input"
              placeholder="Receiver Email"
            />
            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region </legend>
              <select
                {...register("receiverRegion", { required: true })}
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
              <legend className="fieldset-legend">Receiver District </legend>
              <select
                {...register("receiverDistrict", { required: true })}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(receiverRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            <label className="label"> Address </label>
            <input
              type="text"
              {...register("receiverAddress", { required: true })}
              className="input"
              placeholder="Address"
            />
          </fieldset>
        </div>
        <input type="submit" className="btn btn-outline" />
      </form>
    </div>
  );
};

export default SendParcel;
