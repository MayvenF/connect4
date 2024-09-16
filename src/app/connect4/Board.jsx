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

function dropChip(id, gameState, setGameState){
    var newArray = Array.from(gameState) // create a copy of the array
    let i = 0;
    while(!newArray[i][id%7] && i != newArray.length - 1){ i++ }

    if(i){ newArray[i][id%7] = 1; }
    
    setGameState(newArray) // set the new gameState
    id = i*7 + id%7
    console.log("the chosen id is: ", id)
    return id
}

// i need to b) loop through the array downwards until there is a number and then place my number on top
function Cell(props){
    const [wasChosen, setWasChosen] = useState(false)

    console.log("in cell and wasChosen for id ", props.id, " is ", wasChosen)
    if (props.id === props.cellToColorId){
        setWasChosen(true)
    }
    return(
        <button 
        style={{backgroundColor: (wasChosen) ? "red" : null}} 
        className="circle-peg" 
        onClick={() => {
            props.handleClick(props.id)}}>
        </button>  
    )
}


function Row(props){
    const cells = Array.from(
        Array(props.cols).keys())
        .map(id => <Cell 
            key={props.id*props.cols + id} 
            id={props.id*props.cols + id}
            chosenCellId={props.chosenCellId}
            handleClick={props.handleClick}
            />)
    
    return(
        <div className="row">
            {cells}
        </div>
    )   
}

function fillStateArray(rows, cols){
    return Array.from(Array(rows), () => new Array(cols).fill(0));
}


function Board(props){
    const [isHumanTurn, setIsHumanTurn] = useState(true)
    const [gameState, setGameState] = useState(fillStateArray(props.rows, props.cols)) // gameState is a nested array that represents the connect 4 board
    const [chosenCellId, setChosenCellId] = useState(null)

    const handleClick = (id) => {
        if(isHumanTurn) {
            // update game state to reflect human's move
            const cellToColorId = dropChip(id, gameState, setGameState) 
            setChosenCellId(cellToColorId)  // sets the humans move

            // computer's turn!
            setIsHumanTurn(false)

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

    const rows = Array.from(
        Array(props.rows).keys())
        .map(id => <Row 
            key={id} 
            id={id} 
            cols={props.cols}
            chosenCellId={chosenCellId}
            handleClick={handleClick}
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

