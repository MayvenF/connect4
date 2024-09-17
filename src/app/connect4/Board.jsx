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
    return newArray

}


function fillStateArray(rows, cols){
    return Array.from(Array(rows), () => new Array(cols).fill(0));
}

function rdmIdx(i){
    return Math.floor(Math.random() * i)
}

function Cell({status, col, handleClick}){
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

    const getAIMove = async (gameState) => {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        const response = await data.json()
        console.log(response)
        return response;
    }

    const handleClick = async (col) => {
        if(isHumanTurn) {
           
           setGameState(dropChip(col, gameState))
           
            const data = await getAIMove(gameState)
            var col2 = rdmIdx(7)
            var i = gameState[rdmIdx(6)][col2]
            console.log(i)
            while (i) {
                col2 = rdmIdx(7)
                i = gameState[rdmIdx(6)][col2]
            }
            
            setGameState(dropChip(col2, gameState))
            // need to render the computers decision on the UI (aka setCellToColor)
            setIsHumanTurn(true)
        }
    };     

    useEffect(() => {
        handleClick()
    }, [])

        
    return(
        <div className='board'>
            {gameState.map((row, i) => 
            <div key={i} className="row">
                {row.map((cell, j) => 
                    <Cell key={i*props.rows + j} status={cell} col={j} handleClick={handleClick} />)}
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

