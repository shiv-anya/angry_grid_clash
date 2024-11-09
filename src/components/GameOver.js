import React from "react";

export const GameOver = () => {
  return (
    <div className="h-screen w-full flex text-black">
      <div className="h-full bg-[url('/src/assets/red-half.jpg')] flex-1 bg-center bg-cover"></div>
      <div className="h-full bg-[url('/src/assets/pig-half.jpg')] flex-1 bg-center bg-cover"></div>
    </div>
  );
};
