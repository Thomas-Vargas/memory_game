import React from 'react'

const HighScore = ({ difficulty, easyHighScore, medHighScore, hardHighScore }) => {
  return (
    <div className="display-cell">
      <h2>High Score</h2>
      {difficulty === 'Easy' ? <h2>{easyHighScore}</h2> : ''}
      {difficulty === 'Medium' ? <h2>{medHighScore}</h2> : ''}
      {difficulty === 'Hard' ? <h2>{hardHighScore}</h2> : ''}
    </div>
  )
}

export default HighScore