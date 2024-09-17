'use client'  // client can interact with it
import { useState, useEffect } from 'react';
import './styles.css';
import Board from './Board';

// helper functions

const fillStateArray = (rows, cols) => {
    return Array.from(Array(rows), () => new Array(cols).fill(0));
}

const rdmIdx = (i) => {
    return Math.floor(Math.random() * i)
}

const dropChip = (col, gameState, player) => {
    let newArray = gameState.slice() // create a copy of the array
    let i = 0;
    while(i != newArray.length && !newArray[i][col]){ i++ }

    if(i){ newArray[i-1][col] = player; }
    console.log("i is ", i)
    return newArray

}

const checkWinner = (player, gameState, rows, cols) => { 
    // for efficency, start checking from the bottom of the board
    for(var i = rows - 1; i >= 0; i--){
        for(var j = cols - 1; j >= 0; j--){
            
            // check vertically
            if(i-3 >= 0 && gameState[i][j] === player && gameState[i-1][j] === player && gameState[i-2][j] === player && gameState[i-3][j] === player){ return true;}
            // check horozontally
            if(j-3 >= 0 && gameState[i][j] === player && gameState[i][j-1] === player && gameState[i][j-2] === player && gameState[i][j-3] === player){ return true;}
            // check diagonal up
            if(i-3 >= 0 && j-3 >= 0 && gameState[i][j] === player && gameState[i-1][j-1] === player && gameState[i-2][j-2] === player && gameState[i-3][j-3] === player){ return true;}
            // check diagonal down
            if(i+3 < rows && j-3 >= 0 && gameState[i][j] === player && gameState[i+1][j-1] === player && gameState[i+2][j-2] === player && gameState[i+3][j-3] === player){ return true;}
        }
    }

    return false
}


export default function Game(){
    const rows=6
    const cols=7

    const [state, setState] = useState({
        isHumanTurn: true,
        gameState: fillStateArray(rows, cols),
        winner: null
    })
    
    const [isHumanTurn, setIsHumanTurn] = useState(true)
    const [gameState, setGameState] = useState(fillStateArray(rows, cols)) // gameState is a nested array that represents the connect 4 board
    const [winner, setWinner] = useState(null)


    const getAIMove = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        const response = await data.json()
        console.log(response)
        return response;
    }

    const getRandomMove = () => {
        var col2 = rdmIdx(7)
        var i = gameState[rdmIdx(6)][col2]
        console.log(i)
        while (i) {
            col2 = rdmIdx(7)
            i = gameState[rdmIdx(6)][col2]
        }
        return col2
    }

    const handleClick = async (humanChoice) => {
        if(isHumanTurn) {
            // play for human!
            var player = 1
            setGameState(dropChip(humanChoice, gameState, player))
            if(checkWinner(player, gameState, rows, cols)) { 
                setWinner("Human") 
                setIsHumanTurn(false)
                return
            }
            

            // play for computer!
            player = 2
            //const data = await getAIMove(gameState) // holds the API call
            const computerChoice = getRandomMove()
            setGameState(dropChip(computerChoice, gameState, player))
            if(checkWinner(player, gameState, rows, cols)) { 
                setWinner("Computer")
                return
            }
            setIsHumanTurn(true)
        }
    };     


    return (
        <>
            <Board gameState={gameState} handleClick={handleClick} />
            {winner && (
                <div className="winner-display">
                    <h1 className="winner">{winner} Won</h1>
                    <button class="play-again" onClick={() => {
                        setGameState(fillStateArray(rows, cols))
                        setWinner(null)
                        setIsHumanTurn(true)}}>Play again</button>
                </div>)}
        </>
    )

}

