import React, { useState, useEffect } from 'react'
import Timer from '../components/Timer'

const PlayButton = () => {
  const [showButton, setShowButton] = useState(true)
  const [roundCount, setRoundCount] = useState(1)
  const [timeLeft, setTimeLeft] = useState(null)
  const [roundTime, setRoundTime] = useState(null)
  const [selectionTime, setSelectionTime] = useState(null)
  const [randomCells, setRandomCells] = useState([])

  const startGame = () => {
    setShowButton(false)
    setTimeLeft(3)
    playRound()
  }
  
  const playRound = () => {
    randomSelection()
    console.log(`Round: ${roundCount}`)
    setRoundCount(roundCount + 1)
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

  //round timer
  useEffect(() => {
    const unselectCells = () => {
      for(let i = 0; i < randomCells.length; i++) {
        let selectedCell = document.getElementById(`cell-${randomCells[i]}`)
        selectedCell.classList.remove('selected')
      }
    }

    if(roundTime === 0) {
      console.log('round time left is 0')
      setRoundTime(null)
      setSelectionTime(10)
    }

    if(!roundTime) {
      unselectCells()
      return
    }

    const intervalId = setInterval(() => {
      setRoundTime(roundTime - 1)
      console.log(roundTime)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [roundTime, randomCells])

  //selection timer
  useEffect(() => {
    if(selectionTime === 0) {
      console.log('selection time over')
      setSelectionTime(null)
    }

    if(!selectionTime) {
      setShowButton(true)
      return
    }

    const intervalId = setInterval(() => {
      setSelectionTime(selectionTime - 1)
      console.log(selectionTime)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [selectionTime])

  //handle game start
  useEffect(() => {
    const changeCells = () => {
      for(let i = 0; i < randomCells.length; i++) {
        let selectedCell = document.getElementById(`cell-${randomCells[i]}`)
        selectedCell.classList.add('selected')
      }
    }

    if(timeLeft === 0) {
      console.log('time left is 0')
      setTimeLeft(null)
      setRoundTime(5)
    }

    if(!timeLeft) {
      changeCells()
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
        <div>
        {showButton ? (
            <button id='play-btn' className='play-btn' onClick={startGame}>
              Play
            </button>
          ) : <Timer time={timeLeft} roundTime={roundTime} selectionTime={selectionTime} />}
        </div>
    )
}

export default PlayButton
