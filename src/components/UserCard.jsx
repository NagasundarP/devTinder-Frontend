import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {user && (
        <div className="card bg-base-300 w-96 shadow-sm" key={user.firstName}>
          <figure>
            <img src={user.photoUrl} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.age}</p>
            <p>{user.about}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => handleRequest("interested", user._id)}
              >
                Interested
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleRequest("ignored", user._id)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
