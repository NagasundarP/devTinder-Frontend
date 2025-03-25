import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsReq = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsReq) return;
  if (connectionsReq.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div>
      <div className="text-center my-10 w-1/2">
        <h1 className="text-bold text-2xl">Connections</h1>
        {connectionsReq &&
          connectionsReq.map((connection) => {
            return (
              <div
                className="flex m-4 p-4 rounded-lg bg-base-200"
                key={connection._id}
              >
                <div>
                  <img
                    src={connection.photoUrl}
                    className="w-50 h-50 mr-4 rounded-xl"
                  />
                </div>
                <div>
                  <div>{connection.firstName}</div>
                  <div>{connection.about}</div>
                  {connection.age && connection.gender && (
                    <p>{connection.age + ", " + connection.gender}</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;
