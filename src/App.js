import { useState } from "react";
import { Welcome } from "./components/Welcome";
import { Board } from "./components/Board";
import { GameOver } from "./components/GameOver";

function App() {
  const [pageName, setPageName] = useState("welcome");
  const [winner, setWinner] = useState("");
  const pageHandler = () => {
    setPageName("board");
  };
  const pageSetToFinish = (winner) => {
    setWinner(winner);
    setPageName("finish");
  };
  return (
    <>
      {pageName === "welcome" && <Welcome pageHandler={pageHandler} />}
      {pageName === "board" && <Board pageSetToFinish={pageSetToFinish} />}
      {pageName === "finish" && <GameOver winner={winner} />}
    </>
  );
}

export default App;
