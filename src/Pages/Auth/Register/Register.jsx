import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const { createUserFunc, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImg = data.image[0];
    // console.log({ data, profileImg });

    createUserFunc(data.email, data.password)
      .then((res) => {
        // store the image and get the photoUrl
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host_key
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data);
        });
        //update user profile to firebase
        const userProfile = {
          displayName: data.name,
          photoURL: res.photoURL,
        };
        updateUserProfile(userProfile).then(() => {
          navigate("/");
        });
        console.log(res.user);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <h1 className="text-center font-bold text-3xl">Welcome Back </h1>
        <p className="text-center text-gray-400 font-semibold text-lg">
          Register with ZapShift
        </p>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input"
            placeholder="photo"
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-500"> Photo is required</p>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500"> Email is required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p role="alter" className="text-red-500">
              {" "}
              Password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              {" "}
              Password must be 8 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              {" "}
              Password must have at least one uppercase ,at least one lowercase
              ,at least one number , and at least one special characters.
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
