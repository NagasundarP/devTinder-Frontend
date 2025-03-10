import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      axios
        .post("http://localhost:3000/login", {
          emailId: emailId,
          password: password,
        })
        .then((response) => {
          console.log(response);
          dispatch(addUser(response.data));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>

        <label className="fieldset-label">Email</label>
        <input
          type="email"
          value={emailId}
          className="input"
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="fieldset-label">Password</label>
        <input
          type="password"
          value={password}
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};
export default Login;
