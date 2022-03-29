const Timer = ({ time, roundTime, selectionTime }) => {
    return (
      <div className='countdown'>
        {time}
        {roundTime}
        {selectionTime}
      </div>
    )
}

export default Timer