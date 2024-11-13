import React, { useState } from "react";
import Play from "../assets/play.png";
import Music from "../assets/music.png";
import Mute from "../assets/stopMusic.png";
import theme from "../assets/theme.mp3";

export const Welcome = ({ pageHandler }) => {
  const [audio, setAudio] = useState(new Audio(theme));
  const [isPlaying, setIsPlaying] = useState(false);
  function playMusic() {
    audio.loop = true;
    audio.play().catch((e) => console.log(e));
    setIsPlaying(true);
  }
  function stopMusic() {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }
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
      <button>
        <img
          src={Music}
          className="fixed bottom-2 right-2"
          onClick={stopMusic}
        />
        {!isPlaying && (
          <img
            src={Mute}
            className="fixed bottom-4 right-[13px]"
            onClick={playMusic}
          />
        )}
      </button>
    </div>
  );
};
