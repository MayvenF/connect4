'use client'  // client can interact with it
import { useState, useEffect } from 'react';
import './styles.css';

// change circle name to cell
// see if you can reduce the number of props being passed down, maybe the button is handling too much, maybe it should just set the human turn to false and pass up its row number,
// and game will do the calculation of drop chip and recieve the cpu move...
// wasClicked state is kinda irrelevent, maybe delete
// board doesnt work if we try to click twice, maybe has something to do with the game state...?
// commend drop chip
// do you need to pass down the number of column?
// a better way: instead of passing EVERYTHING from the board to the cell, just pass the handle click function
// also we dont care if we click on a cell, we care about the row id! so lets put the handleclick in the row div
// after we change state, everything gets rerendered

function dropChip(col, gameState, setGameState){
    let newArray = gameState.slice() // create a copy of the array
    let i = 0;
    while(i != newArray.length && !newArray[i][col]){ i++ }

    if(i){ newArray[i-1][col] = 1; }
    console.log("i is ", i)
    setGameState(newArray) // set the new gameState

}

// // i need to b) loop through the array downwards until there is a number and then place my number on top
// function Cell(props){
//     const [wasChosen, setWas Chosen] = useState(false)

//     console.log("in cell and wasChosen for id ", props.id, " is ", wasChosen)
//     if (props.id === props.cellToColorId){
//         setWasChosen(true)
//     }
//     return(
//         <button 
//         style={{backgroundColor: (wasChosen) ? "red" : null}} 
//         className="circle-peg" 
//         onClick={() => {
//             props.handleClick(props.id)}}>
//         </button>  
//     )
// }


// function Row(props){
//     const cells = Array.from(
//         Array(props.cols).keys())
//         .map(id => <Cell 
//             key={props.id*props.cols + id} 
//             id={props.id*props.cols + id}
//             chosenCellId={props.chosenCellId}
//             handleClick={props.handleClick}
//             />)
    
//     return(
//         <div className="row">
//             {cells}
//         </div>
//     )   
// }

function fillStateArray(rows, cols){
    return Array.from(Array(rows), () => new Array(cols).fill(0));
}

















function Cell({status, col, handleClick}){
    console.log("i am a cell and my column is ", col, " and my value is ", status)
    let color = "grey"
    
    if (status === 1) { color = "red"}
    else if (status === 2) { color = "black"}

    return (
        <button style={{backgroundColor: color}} className='circle-peg' onClick={() => handleClick(col)}></button>
    )
}

function Board(props){
    const [isHumanTurn, setIsHumanTurn] = useState(true)
    const [gameState, setGameState] = useState(fillStateArray(props.rows, props.cols)) // gameState is a nested array that represents the connect 4 board

    const handleClick = (col) => {
        if(isHumanTurn) {
            // update game state to reflect human's move
            dropChip(col, gameState, setGameState) 

            // computer's turn!
            setIsHumanTurn(false)
            console.log(gameState)
            // get and set computer's move
            setGameState(() => {
                return gameState
                // fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
                // .then((response) => response.json())
                // .then((data) => console.log(data))
                // .catch((err) => console.log(err))
            })
            
            // need to render the computers decision on the UI (aka setCellToColor)
            setIsHumanTurn(true)
        }
    };     

    

        
    return(
        <div className='board'>
            {gameState.map((row, i) => 
            <div key={i} className="row">
                {row.map((cell, j) => 
                    <Cell key={i*j + j} status={cell} col={j} handleClick={handleClick} />)}
            </div>)}
        </div>
    )
}

export default function Game(){
    const rows=6
    const cols=7

    return (
        <Board rows={rows} cols={cols} />
    )

}

