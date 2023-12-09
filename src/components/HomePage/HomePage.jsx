import React from "react";
import PostFeed from "./PostFeed";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../State/Auth/AuthSlice";
import PostDetails from "./PostDetails";
import {postBack} from "../../State/Posts/PostSlice";

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
  return (
    <div>
      <div className="block bg-teal-600 min-h-screen">
        <div className="flex justify-between ">
          <div>
            <Button
              sx={{
                width: "100px",
                borderRadius: "20px",

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
          </div>

          <Routes>
            <Route path="/" element={<PostFeed />}></Route>
            <Route path="/post/:postId" element={<PostDetails />}></Route>
          </Routes>
          <div>
            <Button
              sx={{
                width: "100px",
                borderRadius: "20px",

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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
