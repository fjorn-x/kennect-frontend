/* eslint-disable react-hooks/exhaustive-deps */
import {Route, Routes} from "react-router-dom";
import "./App.css";
import PostFeed from "./components/HomePage/PostFeed";
import Authentication from "./components/Authentication/Authentication";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserProfile} from "./State/Auth/AuthSlice";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [auth.jwt]);
  return (
    <Routes>
      <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />}></Route>
    </Routes>
  );
}

export default App;
