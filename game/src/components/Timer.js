const Timer = ({ time, roundTime, selectionTime }) => {
    return (
        <div>
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