import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      {" "}
      <form>
        <h1 className="text-center font-bold text-3xl">Welcome Back </h1>
        <p className="text-center text-gray-400 font-semibold text-lg">
          Login with ZapShift
        </p>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <Link to={"/register"} className="link link-hover">
            Register
          </Link>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
