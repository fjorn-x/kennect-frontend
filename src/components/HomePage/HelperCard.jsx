import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {useSearchParams} from "react-router-dom";

const HelperCard = () => {
  const query = useSearchParams()[0].size;
  console.log(query);
  return (
    <div className="border w-[500px] p-3  text-white flex flex-col items-center justify-center">
      <ArrowUpwardIcon />

      <div className="text-lg font-bold">
        {query > 0 && <div>There are no post available for this Search Query.</div>}
        <div>Create a Post By Clicking In The Above Text Field.</div>
      </div>
    </div>
  );
};

export default HelperCard;
