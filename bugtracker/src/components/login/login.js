import React from "react";
// import { Link, NavLink } from 'react-router-dom';

import { useForm } from "react-hook-form";

import './login.styles.css';

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (payload) => console.log("payload:", payload);
  console.log(watch("email"));
  console.log("errors:", errors);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={register({ required: true })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: true,
            minLength: { value: 8, message: "Too short" },
          })}
        />
        <input type="submit" />
        {errors.password && <p>{errors.password.message}</p>}
      </form>

    </div>
  );
}

export default Login;
