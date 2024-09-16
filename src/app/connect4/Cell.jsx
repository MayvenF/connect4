

export default function Circle(props){

    const handleClick = ({ currentTarget }) => {
        // if(props.isHumanTurn) {
        if(true){
            props.setIsHumanTurn(false)
            // dropChip(props.id, props.gameState, props.setGameState) // this should return the id of the colored cell and it should be passed up in a state to the board who will color the cell
        
            // // get computer's move
            // props.setGameState(() => {
            //     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            //     .then((response) => response.json())
            //     .then((data) => console.log(data))
            //     .catch((err) => console.log(err))
            // })
        }
      };


    return(
        <button className="circle-peg" onClick={handleClick}></button>  
        // style={{props.id === props.cellToColorId && "red"}}
    )
}