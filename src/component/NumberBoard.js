import React, { useState } from 'react';
import { getRandomNumber, checkBingo } from './utils'; // นำเข้าฟังก์ชันจาก utils.js

// ฟังก์ชันสุ่มกระดาน 5x5
function generateBoard() {
  const pool = Array.from({ length: 99 }, (_, i) => i + 1);
  const board = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => ({ number: getRandomNumber(pool), marked: false }))
  );
  return board;
}

const NumberBoard = () => {
  const [board, setBoard] = useState(generateBoard());
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [numberPool, setNumberPool] = useState(Array.from({ length: 99 }, (_, i) => i + 1));
  const [bingo, setBingo] = useState(false);

  // ฟังก์ชันสุ่มตัวเลข
  const callNumber = () => {
    if (numberPool.length === 0 || bingo) return;
    const nextNumber = getRandomNumber(numberPool);
    setCalledNumbers((prev) => [...prev, nextNumber]);

    setBoard((prevBoard) =>
      prevBoard.map((row) =>
        row.map((cell) => (cell.number === nextNumber ? { ...cell, marked: true } : cell))
      )
    );

    if (checkBingo(board)) {
      setBingo(true);
    }
  };

  // ฟังก์ชันสุ่มกระดานใหม่
  const resetBoard = () => {
    setBoard(generateBoard());
    setNumberPool(Array.from({ length: 99 }, (_, i) => i + 1));
    setCalledNumbers([]);
    setBingo(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`flex items-center justify-center w-16 h-16 ${
                cell.marked ? 'bg-blue-500 text-white' : 'bg-green-200 text-black'
              } font-bold text-xl rounded shadow`}
            >
              {cell.number}
            </div>
          ))
        )}
      </div>
      {!bingo && (
        <button
          onClick={callNumber}
          disabled={bingo || numberPool.length === 0}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 disabled:opacity-50"
        >
          สุ่มตัวเลข
        </button>
      )}
      {bingo && (
        <div className="text-lg font-bold mt-4 text-green-600">
          🎉 คุณบิงโกแล้ว! 🎉
        </div>
      )}
      <button
        onClick={resetBoard}
        className="px-4 py-2 bg-green-500 text-white font-bold rounded shadow hover:bg-green-600 mt-4"
      >
        สุ่มกระดานใหม่
      </button>
      <div className="text-lg font-bold mt-4">
        {bingo ? '' : `ตัวเลขที่สุ่มแล้ว: ${calledNumbers.join(', ')}`}
      </div>
    </div>
  );
};

export default NumberBoard;