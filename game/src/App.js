import React, { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import Footer from './components/Footer'

function App() {
  const [showButton, setShowButton] = useState(true)
  const [timeLeft, setTimeLeft] = useState(null)
  const [randomCells, setRandomCells] = useState([])

  const startGame = () => {
    setShowButton(false)
    setTimeLeft(3)
  }

  const randomSelection = () => {
    
  }

  const Timer = ({ time }) => {
    return (
      <div className='countdown'>
        {time}
      </div>
    )
  }


  useEffect(() => {
    if(timeLeft === 0) {
      console.log('time left is 0')
      setTimeLeft(null)
    }

    if(!timeLeft) {
      setShowButton(true)
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
      console.log(timeLeft)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  return (
    <div className='main'>
      <h1>Memory Game</h1>
      {showButton ? (
        <button id='play-btn' className='play-btn' onClick={startGame}>
        Play
      </button>
      ) : <Timer time={timeLeft} />}
      <Board />
      <Footer />
    </div>
  )
}

export default App
