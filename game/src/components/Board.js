const Cell = ({ number, handleCellClick }) => {
    return (
        <div className='cell-container' onClick={handleCellClick}>
            <button 
                id={`cell-${ number }`} 
                className='cell hover' 
                value={number}
                disabled
            >
            </button>
        </div>
    )
}

const Board = ({ test, handleCellClick }) => {
    let cells = []

    for(let i = 1; i < 26; i++) {
        cells.push(i)
    }
    
    return (
        <div className='game-board' id='board'>
            {cells.map((cell) => 
                <Cell number={cell} key={cell} handleCellClick={handleCellClick} />
            )}
        </div>
    )
}

export default Board