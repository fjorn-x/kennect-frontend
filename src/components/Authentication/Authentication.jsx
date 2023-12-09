import {Divider} from "@mui/material";
import React from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const Authentication = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold mb-48 mt-5">Kennect Assignment</h1>

      <div className="w-[500px]">
        <div className="w-full ">
          <SignupModal />
        </div>
        <Divider>or</Divider>
        <div>
          <LoginModal />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
