import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const { register, watch, handleSubmit } = useForm();
  const serviceCenter = useLoaderData();
  const regionDuplicate = serviceCenter.map((c) => c.region);
  const region = [...new Set(regionDuplicate)];
  const senderRegion = watch("senderRegion");
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };
  //   console.log(districtByRegion);

  const handleParcelSubmit = (data) => {
    console.log(data);
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
            />
            <label className="label">Sender Email </label>
            <input
              type="email"
              {...register("senderEmail", { required: true })}
              className="input"
              placeholder="Sender Email"
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
            <label className="label"> Address </label>
            <input
              type="text"
              {...register("receiverAddress", { required: true })}
              className="input"
              placeholder="Address"
            />
            <label className="label">Receiver District </label>
            <input
              type="text"
              {...register("receiverDistrict", { required: true })}
              className="input"
              placeholder="Select your district"
            />
          </fieldset>
        </div>
        <input type="submit" className="btn btn-outline" />
      </form>
    </div>
  );
};

export default SendParcel;
