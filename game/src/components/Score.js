import React from 'react'

const Score = ({ score }) => {
  return (
    <div className="display-cell">
      <h2>Score</h2>
      <h2>{score}</h2>
    </div>
  )
}

export default Score