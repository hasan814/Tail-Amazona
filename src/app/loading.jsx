"use client";

import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
