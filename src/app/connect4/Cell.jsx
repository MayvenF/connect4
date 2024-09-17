
function Cell({status, col, handleClick}){
    let color = "grey"
    
    if (status === 1) { color = "red"}
    else if (status === 2) { color = "black"}

    return (
        <button style={{backgroundColor: color}} className='circle-peg' onClick={() => handleClick(col)}></button>
    )
}

export default Cell;