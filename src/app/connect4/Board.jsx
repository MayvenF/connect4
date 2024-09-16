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

function dropChip(id, gameState, setGameState){
    var newArray = Array.from(gameState) // create a copy of the array
    let i = 0;
    while(!newArray[i][id%7] && i != newArray.length - 1){
        i++
    }
    console.log(i)
    if(i){ 
        newArray[i][id%7] = 1;
    }

    console.log(newArray)
    //newArray[Math.floor(props.id/7)][props.id%7] = 1;  // change the selected human cell to 1
    setGameState(newArray) // set the new gameState
    return [i, id&7]
}

// i need to b) loop through the array downwards until there is a number and then place my number on top
function Circle(props){
    const [wasClicked, setWasClicked] = useState(false)


    const handleClick = ({ currentTarget }) => {
        // if(props.isHumanTurn) {
        if(true){
            setWasClicked(true) // not sure we need this variable
            props.setIsHumanTurn(false)
            dropChip(props.id, props.gameState, props.setGameState) // this should return the id of the colored cell and it should be passed up in a state to the board who will color the cell
        
            // get computer's move
            props.setGameState(() => {
                fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
            })
        }
      };


    return(
        <button className="circle-peg" onClick={handleClick}></button>  
        // style={{props.id === props.cellToColorId && "red"}}
    )
}


function Row(props){
    const circles = Array.from(
        Array(props.cols).keys())
        .map(id => <Circle 
            key={props.id*props.cols + id} 
            id={props.id*props.cols + id}
            cols={props.cols}
            gameState={props.gameState}
            setGameState={props.setGameState}
            isHumanTurn={props.isHumanTurn} 
            setIsHumanTurn={props.setIsHumanTurn}
            />)
    
    return(
        <div className="row">
            {circles}
        </div>
    )   
}

function fillStateArray(rows, cols){
    return Array.from(Array(rows), () => new Array(cols).fill(0));
}


function Board(props){
    const [isHumanTurn, setIsHumanTurn] = useState(true)
    const [gameState, setGameState] = useState(fillStateArray(props.rows, props.cols)) // gameState is a nested array that represents the connect 4 board

    const cellToColorId = dropChip(id, gameState, setGameState)
    const rows = Array.from(
        Array(props.rows).keys())
        .map(id => <Row 
            key={id} 
            id={id} 
            cols={props.cols}
            gameState={gameState}
            setGameState={setGameState}
            isHumanTurn={isHumanTurn} 
            setIsHumanTurn={setIsHumanTurn}
            />)

        
    return(
        <div className='board'>
            {rows}
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

