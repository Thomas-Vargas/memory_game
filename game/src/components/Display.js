import React from 'react'

import Round from '../components/Round'
import Timer from '../components/Timer'
import Score from '../components/Score'
import HighScore from './HighScore'

const Display = ({ round, time, roundTime, selectionTime, score, difficulty, easyHighScore, medHighScore, hardHighScore }) => {
  return (
    <div>
      <Timer time={time} roundTime={roundTime} selectionTime={selectionTime} />
      <div className='display'>
        <Round round={round} /> 
        <Score score={score} />
        <HighScore 
          difficulty={difficulty}
          easyHighScore={easyHighScore}
          medHighScore={medHighScore}
          hardHighScore={hardHighScore}
        />
        <div className="display-cell">
          <h2>Difficulty</h2>
          <h2>{difficulty}</h2>
        </div>
      </div>
    </div>
  )
}

export default Display