import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/UserFeed.jsx";
import Profile from "./components/Profile.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
