import { useState } from 'react'
import './App.css'

interface GridEsquema {
  row: number;
  col: number;
}

function App() {

  const [grid, setGrid] = useState([
    [2,1,4,0],
    [1,5,3,2],
    [3,0,4,5],
  ]);
  
  const [isReveled, setIsReveled] = useState(new Array(grid.length).fill('').map(()=> 
  new Array(grid[0].length).fill(false)));

  const [firstItem, setFirstItem] = useState<GridEsquema>();

  const handleSelectCard = (row: number, col: number)=> {

    if(isReveled[row][col]) return;

    const clickedNumber = grid[row][col];
    const newIsReveled = [...isReveled];
    newIsReveled[row][col] = true;
    setIsReveled(newIsReveled);
    
    if(firstItem){
      const firstNumberChoosed = grid[firstItem.row][firstItem.col];
      if(firstNumberChoosed !== clickedNumber){
        setTimeout(()=>{
          newIsReveled[firstItem.row][firstItem.col] = false;
          newIsReveled[row][col] = false;
          setIsReveled([...newIsReveled]);
        }, 1000);
      }else{
        const youWin = isReveled.flat().every((states)=> states);
        if(youWin){
          setTimeout(()=>{
            alert('Ganhou!');
          },1000);
        };
      };
      setFirstItem(undefined);
    }else{
      setFirstItem({
        row,
        col
      });
    };

  }

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((number, colIndex)=>(<div
          onClick={()=>handleSelectCard(rowIndex,colIndex)}
          className={"card " + ( isReveled[rowIndex][colIndex] ? "clicked" : '')} key={colIndex}>
            {isReveled[rowIndex][colIndex] ? number : ''}</div>))}
        </div>
        ))}
      </div>
    </div>
  )
}

export default App
