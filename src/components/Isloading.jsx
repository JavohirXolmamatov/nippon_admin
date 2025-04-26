import React from "react";
import { Commet } from "react-loading-indicators";

function Isloading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />;
    </div>
  );
}

export default Isloading;
