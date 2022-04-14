import React from 'react'

const Timer = ({ time, roundTime, selectionTime }) => {
  return (
    <div className="timer">
      <div className='countdown'>
        {time}
      </div>
      <div className='countdown'>
        {roundTime}
      </div>
      <div className='countdown'>
        {selectionTime}
      </div>
    </div>
  )
}

export default Timer