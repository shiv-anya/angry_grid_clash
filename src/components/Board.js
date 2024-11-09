import React from "react";
import { Square } from "./Square";

export const Board = ({ pageSetToFinish }) => {
  return (
    <div className="h-screen w-full bg-[url('/src/assets/hero.jpg')] bg-cover bg-center">
      <div className="w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
        <div
          className="birdChance bg-red-300 size-80 flex flex-col gap-4"
          onClick={pageSetToFinish}
        >
          <div className="flex justify-between">
            <Square sqIndex={0} />
            <Square sqIndex={1} />
            <Square sqIndex={2} />
          </div>
          <div className="flex justify-between">
            <Square sqIndex={3} />
            <Square sqIndex={4} />
            <Square sqIndex={5} />
          </div>
          <div className="flex justify-between">
            <Square sqIndex={6} />
            <Square sqIndex={7} />
            <Square sqIndex={8} />
          </div>
        </div>
      </div>
    </div>
  );
};
