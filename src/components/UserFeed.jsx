import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useState } from "react";

const Feed = () => {
  // const [data, setData] = useState(null);
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
      // console.log(res?.data?.data);
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <UserCard user={feed?.[0]} />
    </div>
  );
};

export default Feed;
