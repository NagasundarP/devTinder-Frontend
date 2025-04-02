import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/Feed");
    } catch (err) {
      setError(err?.message || "Something went wrong");
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        {
          emailId: emailId,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data))
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">
          {isLogin ? "Login" : "Signup"}
        </legend>
        <label className="fieldset-label">Email</label>
        {!isLogin && (
          <>
            <input
              type="text"
              value={firstName}
              className="input"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              value={lastName}
              className="input"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="fieldset-label">Last Name</label>
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
        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <>
          <p
            className="text-blue-300 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New User? Signup here" : "Existing User? Login here"}
          </p>
        </>
      </fieldset>
    </div>
  );
};
export default Login;
