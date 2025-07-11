import React, { useState, useRef} from "react";
import "./GameBox.css";

const GameBox = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const clicked = useRef(0);
  const [msg, setMsg] = useState("🤖 X vs O: Who will reign supreme?");
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
  if (boxes[index] !== "" || gameOver) return;

  clicked.current += 1;
  const newBoxes = [...boxes];
  newBoxes[index] = turn ? "X" : "O";

  setBoxes(newBoxes);

  const isWin = checkWin(newBoxes); // Only call once
  if (!isWin && clicked.current === 9) {
    setMsg("🤝 It's a draw! No winners this time, but well played!");
    setGameOver(true);  // Prevent further moves
    clicked.current = 0;
  }

  if (!isWin) {
    setTurn(!turn);
  }
};


  const checkWin = (updatedBoxes) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        updatedBoxes[a] &&
        updatedBoxes[a] === updatedBoxes[b] &&
        updatedBoxes[a] === updatedBoxes[c]
      ) {
        setMsg(`🔥 ${updatedBoxes[a]} just claimed Tic-Tac-Toe glory!`);
        setGameOver(true);
        return true;
      }
    }
  };

  const resetGame = () => {
  setBoxes(Array(9).fill(""));
  setMsg("🤖 X vs O: Who will reign supreme?");
  setGameOver(false);
  clicked.current = 0;
};


  return (
    <>
      <div className="msgBox mt-10 flex flex-col items-center gap-4">
        <div className="msg text-center text-2xl bg-violet-300 text-violet-900 font-semibold px-6 py-4 mx-5 rounded-xl shadow-md border-2 border-violet-500 w-fit">
          {msg}
        </div>
      </div>

      <div className="container">
        <div className="gameBox">
          {boxes.map((value, index) => (
            <button
  onClick={() => handleClick(index)}
  className="box"
  key={index}
>
  <span className={value === "X" ? "text-pink-600" : value === "O" ? "text-blue-800" : ""}>
    {value}
  </span>
</button>

          ))}
        </div>
      </div>
      
      <button
          onClick={resetGame}
          className="bg-gradient-to-r from-purple-600 via-violet-700 to-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
        >
          🎮 Start a New Battle / Reset Game
        </button>
    </>
  );
};

export default GameBox;
