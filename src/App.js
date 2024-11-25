import React from 'react';
import NumberBoard from './component/NumberBoard.js'; 

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">เกมบิงโก</h1>
      <NumberBoard />
    </div>
  );
}

export default App;