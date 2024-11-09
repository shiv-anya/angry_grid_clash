import React from "react";
import Play from "../assets/play.png";

export const Welcome = ({ pageHandler }) => {
  return (
    <div className="h-screen w-full bg-[url('/src/assets/hero.jpg')] bg-cover bg-center flex justify-center items-center">
      <div className="flex-col justify-items-center content-center">
        <h1 className="uppercase text-white text-center text-9xl mb-8">
          Angry Grid Clash
        </h1>
        <button onClick={pageHandler}>
          <img src={Play} className="h-40 hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
