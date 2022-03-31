const Score = ({ score, highScore }) => {
    return (
        <div className="scores">
            <h2>Score: {score}</h2>
            <h2>High Score: {highScore}</h2>
        </div>
    )
}

export default Score