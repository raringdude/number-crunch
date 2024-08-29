import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([]);
  const [covered, setCovered] = useState(new Set());
  const [start, setStart] = useState(false);
  const [nextNumber, setNextNumber] = useState(1);
  const [showNumbers, setShowNumbers] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [gridSize, setGridSize] = useState();
  const [winningNumber, setWinningNumber] = useState();


  const handleStart_3x3 = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
    setGrid(shuffledNumbers);
    // Show all numbers initially
    setShowNumbers(true);
    setStart(false);
    setCovered(new Set());
    setNextNumber(1);
    setGridSize('3x3');
    setWinningNumber(9);

    // Hide the numbers 1-5 after 5 seconds
    setTimeout(() => {
      setShowNumbers(true);
      const initialCovered = new Set([1, 2, 3, 4, 5]);
      setCovered(initialCovered);
      setStart(true);
    }, 5000);
  };

  const handleStart_5x5 = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
    setGrid(shuffledNumbers);
    // Show all numbers initially
    setShowNumbers(true);
    setStart(false);
    setCovered(new Set());
    setNextNumber(1);
    setGridSize('5x5');
    setWinningNumber(25);

    // Hide the numbers 1-5 after 5 seconds
    setTimeout(() => {
      setShowNumbers(true);
      const initialCovered = new Set([1, 2, 3, 4, 5]);
      setCovered(initialCovered);
      setStart(true);
    }, 5000);
  };

  const handleClick = (num) => {
    if (start) {
      
     
      
      console.log('Current Covered Set:', Array.from(covered));
      // Check if the clicked number is the next number
      if (num === nextNumber) {
         if(nextNumber == winningNumber){
            console.log("You Win")
          }
        // Remove the clicked number from the set
        setCovered(prev => {
          const newCovered = new Set(prev);
          newCovered.delete(num); // Remove the clicked number
          return newCovered;
        });

        console.log(nextNumber);

        setCovered(prev => {
          const newCovered = new Set(prev);
          newCovered.add(nextNumber+5);
          return newCovered;
        })
  
        setNextNumber(prev => prev + 1);
      }
    }
  };
  
  

  return (
    <div className="App">
      <button onClick={handleStart_3x3}>Start 3x3</button>
      <button onClick={handleStart_5x5}>Start 5x5</button>
      <div className={gridSize == "3x3" ? 'grid_3x3' : 'grid_5x5'}>
        {grid.map((num, index) => (
          <div
            key={index}
            className={`cell ${covered.has(num) ? 'covered' : ''} ${num < nextNumber && !covered.has(num) ? 'correct' : ''}`}
            onClick={() => handleClick(num)}
          >
          {(covered.has(num)) ? '' : num}
          </div>
        ))}
      </div>
      <div>Next Number: {nextNumber}</div>
    </div>
  );
}

export default App;
