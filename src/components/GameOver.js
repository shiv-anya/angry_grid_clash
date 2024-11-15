import React, { useEffect, useState } from "react";
import BirdsArmy from "../assets/birdsArmy.png";
import PigsArmy from "../assets/pigsArmy.png";
import Flag from "../assets/flag.png";
import birdWonAudio from "../assets/birdsWonAudio.mp3";
import pigWonAudio from "../assets/pigWonAudio.mp3";
import Marquee from "react-fast-marquee";
import ReactConfetti from "react-confetti";
import Restart from "../assets/reset.png";
import Banner from "../assets/pointsBanner.png";

export const GameOver = ({ winner }) => {
  const [birdAud, setBirdAud] = useState(new Audio(birdWonAudio));
  const [pigAud, setPigAud] = useState(new Audio(pigWonAudio));
  const [whoWon, setWhoWon] = useState("game_draw");
  const [birdScore, setBirdScore] = useState(0);
  const [pigScore, setPigScore] = useState(0);
  useEffect(() => {
    const storedBirdScore = Number(localStorage.getItem("birdScore"));
    const storedPigScore = Number(localStorage.getItem("pigScore"));

    if (storedBirdScore && storedPigScore) {
      setBirdScore(storedBirdScore);
      setPigScore(storedPigScore);
    } else {
      localStorage.setItem("birdScore", 0);
      localStorage.setItem("pigScore", 0);
    }
    setWhoWon(winner.winner);
    if (winner.winner === "player_won") {
      birdAud.loop = true;
      birdAud.play();
      const newBirdScore = storedBirdScore + 1;
      setBirdScore(newBirdScore);
      localStorage.setItem("birdScore", newBirdScore);
    }
    if (winner.winner === "player_o_won") {
      pigAud.loop = true;
      pigAud.play();
      const newPigScore = storedPigScore + 1;
      setPigScore(newPigScore);
      localStorage.setItem("pigScore", newPigScore);
    }
  }, []);

  return (
    <div className="h-screen w-full flex lg:flex-row md:flex-row flex-col text-white">
      <form className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button>
          <img src={Restart} className="lg:size-20 md:size-20 size-16 z-0" />
        </button>
      </form>
      {(whoWon === "player_won" || whoWon === "player_o_won") && (
        <ReactConfetti className="h-screen w-full" />
      )}
      {whoWon === "game_draw" && (
        <Marquee
          direction="right"
          style={{ position: "fixed", top: "20px", overflow: "hidden" }}
        >
          <h1 className="lg:text-8xl md:text-6xl text-3xl">DRAW!!</h1>
        </Marquee>
      )}
      {whoWon === "player_won" && (
        <Marquee
          direction="right"
          style={{ position: "fixed", top: "20px", overflow: "hidden" }}
        >
          <h1 className="lg:text-8xl md:text-6xl text-3xl">BIRDS WIN!</h1>
        </Marquee>
      )}
      {whoWon === "player_o_won" && (
        <Marquee
          direction="right"
          style={{ position: "fixed", top: "20px", overflow: "hidden" }}
        >
          <h1 className="lg:text-8xl md:text-6xl text-3xl">PIGS RULE!</h1>
        </Marquee>
      )}
      <div className="lg:h-screen md:h-screen h-1/2 bg-[url('/src/assets/red-half.jpg')] flex-1 bg-center bg-cover">
        <div className="h-full w-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <div className="flex-col justify-items-center">
            <p className="text-7xl mb-5">{birdScore}</p>
            <img src={Banner} className="w-1/2" />
          </div>
        </div>
      </div>
      <div className="lg:h-screen md:h-screen h-1/2 bg-[url('/src/assets/pig-half.jpg')] flex-1 bg-center bg-cover">
        <div className="h-full w-full bg-[rgba(0,0,0,0.6)]  flex items-center justify-center">
          <div className="flex-col justify-items-center">
            <p className="text-7xl mb-5">{pigScore}</p>
            <img src={Banner} className="w-1/2" />
          </div>
        </div>
      </div>
      {whoWon === "player_won" && (
        <Marquee
          direction="right"
          style={{ position: "fixed", bottom: 0, height: "370px" }}
        >
          <div className="fixed bottom-0">
            <img
              src={BirdsArmy}
              alt="birds army"
              className="lg:h-60 md:h-52 h-36 z-30 relative"
            />
            <img src={Flag} className="absolute z-0 bottom-16" />
          </div>
        </Marquee>
      )}
      {whoWon === "player_o_won" && (
        <Marquee
          direction="right"
          style={{ position: "fixed", bottom: 0, height: "300px" }}
        >
          <div className="fixed bottom-0">
            <img
              src={PigsArmy}
              alt="pigs army"
              className="lg:h-36 md:h-36 h-20 relative z-10"
            />
            <img
              src={Flag}
              className="absolute z-0 lg:bottom-0 md:bottom-0 bottom-[-16px] lg:left-60 md:left-60 left-20 lg:h-72 md:h-72 h-48"
            />
          </div>
        </Marquee>
      )}
    </div>
  );
};
