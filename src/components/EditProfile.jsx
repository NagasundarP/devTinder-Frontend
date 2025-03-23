import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ProfileCard from "./ProfileCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      setSuccess(true);
      const i = setInterval(() => {
        setSuccess(false);
        clearInterval(i);
        }, 3000);
      navigate("/Profile");
    } catch (err) {
      setError(err?.message || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10 gap-4">
      {success && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="fieldset-label">First name</label>
          <input
            type="text"
            value={firstName}
            className="input"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="fieldset-label">Last nae</label>
          <input
            type="text"
            value={lastName}
            className="input"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="fieldset-label">Age</label>
          <input
            type="text"
            value={age}
            className="input"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="fieldset-label">About</label>
          <input
            type="text"
            value={about}
            className="input"
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
          />
          <label className="fieldset-label">Photo Url</label>
          <input
            type="text"
            value={photoUrl}
            className="input"
            placeholder="Photo Url"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button className="btn btn-neutral mt-4" onClick={saveProfile}>
            Save
          </button>
        </fieldset>
      </div>
      <div className="my-10">
        <ProfileCard user={{ firstName, lastName, age, about, photoUrl }} />
      </div>
    </div>
  );
};

export default EditProfile;
