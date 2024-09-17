import Cell from './Cell';

function Board(props){
        
    return(
        <div className='board'>
            {props.gameState.map((row, i) => 
            <div key={i} className="row">
                {row.map((cell, j) => 
                    <Cell key={i*props.gameState[0].length + j} status={cell} col={j} handleClick={props.handleClick} />)}
            </div>)}
        </div>
    )
}

export default Board;