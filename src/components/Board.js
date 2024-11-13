import React, { useEffect, useState } from "react";
import Bird from "../assets/redBird.png";
import Pig from "../assets/pig.png";
import { checkWinner } from "./GameState";
import { calculateAITurn } from "./AI";
import pigAudio from "../assets/pigAudio.mp3";
import birdAudio from "../assets/birdAudio.mp3";

export const GAME_STATE = {
  PLAYER_TURN: "player_turn",
  AI_TURN: "ai_turn",
  PLAYER_WON: "player_won",
  AI_WON: "player_o_won",
  DRAW: "game_draw",
  ERROR: "game_error",
};

const GRID_LENGTH = 9;

export const SPACE_STATE = {
  PLAYER: "player_filled",
  AI: "ai_filled",
  EMPTY: "empty_space",
};

const createEmptyGrid = () => {
  return Array(GRID_LENGTH).fill(SPACE_STATE.EMPTY);
};

const getSpaceStateClass = (spaceState) => {
  let space = "";

  if (spaceState === SPACE_STATE.AI) {
    return "o-player";
  }

  if (spaceState === SPACE_STATE.PLAYER) {
    return "x-player";
  }

  return "";
};

const getSquareSymbol = (spaceStatus) => {
  switch (spaceStatus) {
    case SPACE_STATE.PLAYER: {
      return <img src={Bird} />;
    }
    case SPACE_STATE.AI: {
      return <img src={Pig} />;
    }
    case SPACE_STATE.EMPTY: {
      return "";
    }
    default: {
      return "";
    }
  }
};

export const Board = ({ pageSetToFinish }) => {
  const [birdMusic, setBirdMusic] = useState(new Audio(birdAudio));
  const [pigMusic, setPigMusic] = useState(new Audio(pigAudio));
  const [grid, setGrid] = useState(createEmptyGrid());
  const [gameState, setGameState] = useState(GAME_STATE.PLAYER_TURN);
  const [moveCount, setMoveCount] = useState(0);
  const [winSpaces, setWinSpaces] = useState([]);

  const playBirdMusic = () => {
    birdMusic.play().catch((e) => console.log(e));
  };

  const playPigMusic = () => {
    pigMusic.play().catch((e) => console.log(e));
  };
  // Fill in a grid square with status
  const fillGridSpace = (gridIndex, spaceStatus) => {
    setGrid((oldGrid) => {
      oldGrid[gridIndex] = spaceStatus;
      return [...oldGrid];
    });
  };

  // Fill in the grid array with the player space state.
  const handlePlayerClick = (gridIndex) => {
    console.log("here");
    console.log(gridIndex);
    console.log(gameState);
    // If not the player turn, then exit.
    if (gameState !== GAME_STATE.PLAYER_TURN) {
      return;
    }

    // If the current square is empty, then fill in space.
    if (grid[gridIndex] === SPACE_STATE.EMPTY) {
      // Fill grid space
      playBirdMusic();
      fillGridSpace(gridIndex, SPACE_STATE.PLAYER);
      // Update game state to AI's turn.
      setGameState(GAME_STATE.AI_TURN);
      // Update move count
      setMoveCount((oldMoves) => {
        return oldMoves + 1;
      });
    }
  };

  const Square = ({ sqIndex }) => {
    return (
      <div
        className="size-24 bg-gray-900 flex justify-center items-center p-2"
        onClick={() => handlePlayerClick(sqIndex)}
      >
        {getSquareSymbol(grid[sqIndex])}
      </div>
    );
  };

  useEffect(() => {
    // Player took turn and changed game state,
    // check for a winner.
    let winner = checkWinner(grid, moveCount);

    // If the someone won, update state to reflect and set winner spaces.
    if (winner) {
      setGameState(winner.winner);
      setWinSpaces(winner.winSpaces);
    }

    // Run AI turn
    if (gameState === GAME_STATE.AI_TURN && moveCount < 10) {
      const board = document.getElementById("board");
      console.log(board);
      board.classList.add("pointer-events-none");
      async function delay() {
        return new Promise((resolve) =>
          setTimeout(() => resolve(calculateAITurn(grid, moveCount)), 2000)
        );
      }
      (async () => {
        const aiSpace = await delay();
        setMoveCount((oldMoves) => {
          return oldMoves + 1;
        });
        console.log("lofu");
        console.log(board);
        playPigMusic();
        fillGridSpace(aiSpace, SPACE_STATE.AI);
        winner = checkWinner(grid, moveCount);
        board.classList.remove("pointer-events-none");
        if (winner) {
          setGameState(winner.winner);
          setWinSpaces(winner.winSpaces);
        } else {
          setGameState(GAME_STATE.PLAYER_TURN);
        }
      })();
    }
  }, [gameState]);

  return (
    <div className="h-screen w-full bg-[url('/src/assets/hero.jpg')] bg-cover bg-center">
      <div className="w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
        <div
          id="board"
          className={`${
            gameState === GAME_STATE.PLAYER_TURN ? "birdChance" : "pigChance"
          } size-80 flex flex-col gap-4`}
        >
          <div className="flex justify-between">
            <Square sqIndex={0} key={0} />
            <Square sqIndex={1} key={1} />
            <Square sqIndex={2} key={2} />
          </div>
          <div className="flex justify-between">
            <Square sqIndex={3} key={3} />
            <Square sqIndex={4} key={4} />
            <Square sqIndex={5} key={5} />
          </div>
          <div className="flex justify-between">
            <Square sqIndex={6} key={6} />
            <Square sqIndex={7} key={7} />
            <Square sqIndex={8} key={8} />
          </div>
        </div>
      </div>
    </div>
  );
};