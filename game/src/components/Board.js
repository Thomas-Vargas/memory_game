const Cell = ({ number }) => {
    return (
        <div className='cell-container'>
            <button id={`cell-${ number }`} className='cell'>
                { number }
            </button>
        </div>
    )
}

const Board = () => {
    let cells = []

    for(let i = 1; i < 26; i++) {
        cells.push(i)
    }
    
    return (
        <div className='game-board' id='board'>
            {cells.map((cell) => 
                <Cell number={cell} key={cell} />
            )}
        </div>
    )
}

export default Board