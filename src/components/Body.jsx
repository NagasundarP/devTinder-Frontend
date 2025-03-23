import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "profile", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        return navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
export default Body;
