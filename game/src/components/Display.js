import Round from '../components/Round'
import Timer from '../components/Timer'
import Score from '../components/Score'

const Display = ({ round, time, roundTime, selectionTime }) => {
    return (
        <div>
            <Timer time={time} roundTime={roundTime} selectionTime={selectionTime} />
            <div className='display'>
                <Round round={round} /> 
                <Score />
            </div>
        </div>
    )
}

export default Display