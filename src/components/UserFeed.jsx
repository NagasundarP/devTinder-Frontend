import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

const Feed = () => {
  const feed = useSelector((state) => state.feed,{
    withCredentials: true,
  });
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "feed");
      dispatch(addFeed(res?.data?.data));
      console.log(res?.data?.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
};

export default Feed;
