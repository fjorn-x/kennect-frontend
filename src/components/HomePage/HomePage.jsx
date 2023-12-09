import React from "react";
import PostFeed from "./PostFeed";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../State/Auth/AuthSlice";
import PostDetails from "./PostDetails";
import {getAllPosts} from "../../State/Posts/PostSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleHome = () => {
    navigate("/");
    dispatch(getAllPosts());
  };
  return (
    <div>
      <div className="block bg-teal-600 min-h-screen">
        <div className="flex justify-around">
          <div className="flex flex-col justify-center items-center space-y-10 h-screen sticky top-0">
            <Button
              sx={{
                width: "100px",
                borderRadius: "10px",

                py: "8px",
                px: "20px",
                bgcolor: "#9d174d",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              onClick={handleBack}
              variant="contained"
              className="hover:bg-black "
            >
              Back
            </Button>
            <Button
              sx={{
                width: "100px",
                borderRadius: "10px",

                py: "8px",
                px: "20px",
                bgcolor: "#9d174d",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              onClick={handleHome}
              variant="contained"
              className="hover:bg-black "
            >
              Home
            </Button>
            <Button
              sx={{
                width: "100px",
                borderRadius: "10px",
                border: "none",
                py: "8px",
                px: "20px",
                bgcolor: "#9d174d",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              onClick={handleLogout}
              variant="contained"
              className="hover:bg-black "
            >
              Logout
            </Button>
          </div>
          <Routes>
            <Route path="/" element={<PostFeed />}></Route>
            <Route path="/post/:postId" element={<PostDetails />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
