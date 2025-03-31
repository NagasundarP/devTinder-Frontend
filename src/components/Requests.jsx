import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { removeConnections } from "../utils/connectionsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const handleReview = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeConnections(_id))
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div>
      <div className="text-center my-10 w-1/2">
        <h1 className="text-bold text-2xl">Connections</h1>
        {requests &&
          requests.map((req) => {
            return (
              <div
                className="flex m-4 p-4 rounded-lg bg-base-200"
                key={req.fromUserId._id}
              >
                <div>
                  <img
                    src={req.fromUserId.photoUrl}
                    className="w-50 h-50 mr-4 rounded-xl"
                  />
                </div>
                <div>
                  <div>{req.fromUserId.firstName}</div>
                  <div>{req.fromUserId.about}</div>
                  {req.fromUserId.age && req.fromUserId.gender && (
                    <p>{req.fromUserId.age + ", " + req.fromUserId.gender}</p>
                  )}
                  <div className="flex gap-4 mt-4 mx-auto">
                    <button
                      className="btn btn-soft btn-success"
                      onClick={() => handleReview("accepted", req._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-soft btn-error"
                      onClick={() => handleReview("rejected", req._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Requests;
