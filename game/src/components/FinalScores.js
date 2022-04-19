import React from 'react'

const FinalScores = ({ score, easyHighScore, medHighScore, hardHighScore }) => {
  return (
    <div className="scoresToShow">
      <div className='highScores'>
        <p className='label'>High Scores</p>
        <div className='highScore-container'>
          <div className='highScore-cell'>
            <p>Easy</p>
            <p>{easyHighScore}</p>
          </div>
          <div className='highScore-cell'>
            <p>Medium</p>
            <p>{medHighScore}</p>
          </div>
          <div className='highScore-cell'>
            <p>Hard</p>
            <p>{hardHighScore}</p>
          </div>
        </div>
      </div>
      <div className='currentScore'>
        <p className='label'> Current Score</p>
        <p>Score</p>
        <p>{score}</p>
      </div>
    </div>
  )
}

export default FinalScores