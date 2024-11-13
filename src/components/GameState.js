import { GAME_STATE, SPACE_STATE } from "./Board";

const MAX_MOVES = 10;

export const isDraw = (moveCount) => {
  return moveCount === MAX_MOVES;
};

export const checkWinner = (grid, moveCount) => {
  const winnerSpaces = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if (isDraw(moveCount)) {
    return {
      winner: GAME_STATE.DRAW,
      winSpaces: [],
    };
  }

  for (let i = 0; i < winnerSpaces.length; i++) {
    const [a, b, c] = winnerSpaces[i];

    if (
      grid[a] === SPACE_STATE.EMPTY &&
      grid[b] === SPACE_STATE.EMPTY &&
      grid[c] === SPACE_STATE.EMPTY
    ) {
      continue;
    }

    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      let winner = null;

      if (grid[a] === SPACE_STATE.PLAYER) {
        winner = GAME_STATE.PLAYER_WON;
      } else {
        winner = GAME_STATE.AI_WON;
      }

      return {
        winner: winner,
        winSpaces: [a, b, c],
      };
    }
  }

  return null;
};
