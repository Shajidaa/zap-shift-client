import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

const Login = () => {
  const { logInFunc } = use(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const handleLoginFunc = (data) => {
    logInFunc(data.email, data.password);

    const userInfo = {
      email: data.email,
      displayName: data.name,
    };
    axiosSecure.post("/users", userInfo).then((res) => {
      if (res.data.insertedId) {
        console.log("user created in the  data base ");
      }
    });
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(handleLoginFunc)}>
        <h1 className="text-center font-bold text-3xl">Welcome Back </h1>
        <p className="text-center text-gray-400 font-semibold text-lg">
          Login with ZapShift
        </p>

        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <input type="submit" className="btn" />
          <br />
          <SocialLogin></SocialLogin>
          <Link to={"/register"} className="link link-hover">
            Register
          </Link>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
