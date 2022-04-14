import Round from '../components/Round'
import Timer from '../components/Timer'
import Score from '../components/Score'
import HighScore from './HighScore'

const Display = ({ round, time, roundTime, selectionTime, score, highScore }) => {
  return (
    <div>
      <Timer time={time} roundTime={roundTime} selectionTime={selectionTime} />
      <div className='display'>
        <Round round={round} /> 
        <Score score={score} />
        <HighScore highScore={highScore} />
      </div>
    </div>
  )
}

export default Display