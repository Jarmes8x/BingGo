// สุ่มตัวเลข 1-99 โดยไม่ให้ซ้ำ
export function getRandomNumber(pool) {
    const index = Math.floor(Math.random() * pool.length);
    return pool.splice(index, 1)[0];
  }
  
  // ตรวจสอบว่าแถวไหนบิงโก
  export function checkBingo(board) {
    // ตรวจแนวนอน
    for (let i = 0; i < 5; i++) {
      if (board[i].every((cell) => cell.marked)) return true;
    }
  
    // ตรวจแนวตั้ง
    for (let j = 0; j < 5; j++) {
      if (board.every((row) => row[j].marked)) return true;
    }
  
    // ตรวจแนวเฉียง
    if (board.every((row, i) => row[i].marked)) return true;
    if (board.every((row, i) => row[4 - i].marked)) return true;
  
    return false;
  }

  