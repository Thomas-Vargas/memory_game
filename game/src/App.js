import React, { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import Footer from './components/Footer'

function App() {
  const [showButton, setShowButton] = useState(true)
  const [round, setPlayRound] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [randomCells, setRandomCells] = useState([])
  const [roundTime, setRoundTime] = useState(null)

  const startGame = () => {
    setShowButton(false)
    setTimeLeft(3)
    if(timeLeft === null) {
      randomSelection()
    }
  }

  const randomSelection = () => {
    let selections = []
    for (let i = 0; i < 5; i++) {
      selections.push(randomNumber(1, 25))
    }
    setRandomCells(selections)
  }

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const Timer = ({ time }) => {
    return (
      <div className='countdown'>
        {time}
      </div>
    )
  }
  //handle round
  useEffect(() => {
    const changeCells = () => {
      for(let i = 0; i < randomCells.length; i++) {
        let selectedCell = document.getElementById(`cell-${randomCells[i]}`)
        selectedCell.classList.add('selected')
      }
    }

    const playRound = () => {
      
      setRoundTime(5)
    }

    if(!timeLeft) {
      changeCells()
      playRound()
      return
    }
  }, [timeLeft, randomCells])

  //handle game start
  useEffect(() => {
    if(timeLeft === 0) {
      console.log('time left is 0')
      setTimeLeft(null)
    }

    if(!timeLeft) {
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
      console.log(timeLeft)
      console.log(randomCells)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft, randomCells])

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
