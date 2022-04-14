import './App.css'
import React, { useState, useEffect, useCallback } from 'react'
import Board from './components/Board'
import Display  from './components/Display'
import FinalScore from './components/FinalScore'

function App() {
  const [showButton, setShowButton] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [difficulty, setDifficulty] = useState('medium')
  const [timeLeft, setTimeLeft] = useState(null)
  const [roundTime, setRoundTime] = useState(null)
  const [selectionTime, setSelectionTime] = useState(null)
  const [randomCells, setRandomCells] = useState([])
  const [userSelection, setUserSelection] = useState([])
  const [roundCount, setRoundCount] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [scoreToShow, setScoreToShow] = useState(0)

  const startGame = useCallback(
    () => {
      const randomSelection = () => {
        let difficultyNumber = 0
        let selections = []

        if(difficulty === 'easy') {
          difficultyNumber = 3
        } else if(difficulty === 'medium') {
          difficultyNumber = 5
        } else if (difficulty === 'hard') {
          difficultyNumber = 7
        }

        while (selections.length < roundCount + difficultyNumber) {
          let number = randomNumber(1, 25)
          if (selections.includes(number) === false){
            selections.push(number)
          }
        }
        setRandomCells(selections)
      }

      setShowButton(false)
      setShowScore(false)
      setRoundCount(roundCount + 1)
      setUserSelection([])
      setTimeLeft(3)
      randomSelection()
      console.log(`Round: ${roundCount}`)
    },
    [roundCount, difficulty]
  )

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const handleCellClick = (e) => {
    let value = Number(e.target.value)
    console.log(value)
    let button = document.querySelector(`#cell-${value}`)
    if(userSelection.includes(value) === false && userSelection.length < randomCells.length) {
      setUserSelection([...userSelection, value])
      button.classList.add('selected')
      button.classList.remove('hover')
      button.parentElement.classList.add('breathing-animation')
    } else {
      let newArr = userSelection.filter(cell => cell !== value)
      setUserSelection(newArr)
      button.classList.remove('selected')
      button.classList.add('hover')
      button.parentElement.classList.remove('breathing-animation')
    }
  }

  //handle game start
  useEffect(() => {
    const changeCells = () => {
      for(let i = 0; i < randomCells.length; i++) {
        let selectedCell = document.getElementById(`cell-${randomCells[i]}`)
        selectedCell.classList.add('selected')
        selectedCell.parentElement.classList.add('breathing-animation')
      }
    }
  
    if(timeLeft === 0) {
      console.log('time left is 0')
      setTimeLeft(null)
      setRoundTime(3)
    }
  
    if(!timeLeft) {
      changeCells()
      return
    }
  
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
      console.log(randomCells)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft, randomCells])

  //round timer
  useEffect(() => {
    const unselectCells = () => {
      for(let i = 0; i < randomCells.length; i++) {
        let selectedCell = document.getElementById(`cell-${randomCells[i]}`)
        selectedCell.classList.remove('selected')
        selectedCell.parentElement.classList.remove('breathing-animation')
      }
    }

    if(roundTime === 0) {
      console.log('round time left is 0')
      setRoundTime(null)
      let cells = document.getElementsByClassName('cell')
      for(let i = 0; i < cells.length; i++) {
        cells[i].disabled = false
      }
      setSelectionTime(5)
    }

    if(!roundTime) {
      unselectCells()
      return
    }

    const intervalId = setInterval(() => {
      setRoundTime(roundTime - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [roundTime, randomCells])

  //selection timer
  useEffect(() => {
    //calculate score
    const calcScore = () => {
      let matches = randomCells.filter(cell => userSelection.includes(cell))
      setScore(score + (matches.length * 100))
    }

    if(selectionTime === 0) {
      console.log('selection time over')
      setSelectionTime(null)
      if(roundCount < 5) {
        calcScore()
        startGame()
      } 
          
      if(roundCount === 5) {
        calcScore()
        setGameOver(true)
      }

      let cells = document.getElementsByClassName('cell')
      for(let i = 0; i < cells.length; i++) {
        cells[i].disabled = true
        cells[i].classList.remove('selected')
        cells[i].classList.add('hover')
        cells[i].parentElement.classList.remove('breathing-animation')
      }
    }

    if(gameOver === true) {
      //reset game
      setHighScore(score > highScore ? score : highScore)
      setScoreToShow(score)
      setShowScore(true)
      setScore(0)
      setRoundCount(0)
      setShowButton(true)
      setGameOver(false)
    }

    if(!selectionTime) {
      return
    }

    const intervalId = setInterval(() => {
      setSelectionTime(selectionTime - 1)
      console.log('user selected: ', {userSelection})
    }, 1000)
    return () => clearInterval(intervalId)
  }, [selectionTime, roundCount, startGame, userSelection, randomCells, score, gameOver, highScore])

  const PlayButton = () => {
    return (
      <div>
        {showButton ? (
          <button id='play-btn' className='play-btn' onClick={startGame}>
                  Play
          </button>) : 
          <Display 
            round={roundCount}
            time={timeLeft}
            roundTime={roundTime}
            selectionTime={selectionTime} 
            score={score}
            highScore={highScore}
          />
        }          
      </div>
    )
  }

  const DifficultyButtons = () => {
    useEffect(() => {
      if(difficulty === 'easy' && showButton) {
        document.getElementById('easy-btn').classList.add('current-difficulty')
      }
      if(difficulty === 'medium' && showButton) {
        document.getElementById('medium-btn').classList.add('current-difficulty')
      }
      if(difficulty === 'hard' && showButton) {
        document.getElementById('hard-btn').classList.add('current-difficulty')
      }
    },[difficulty])

    return (
      <div>
        {showButton ? (
          <div className="difficulty-btns">
            <button
              id='easy-btn'
              className='difficulty-btn'
              value='easy' 
              onClick={(e) => setDifficulty(e.target.value)}
            >
                        Easy
            </button>
            <button 
              id='medium-btn'
              className='difficulty-btn'
              value='medium'
              onClick={(e) => setDifficulty(e.target.value)}
            >
                        Medium
            </button>
            <button 
              id='hard-btn'
              className='difficulty-btn'
              value='hard'
              onClick={(e) => setDifficulty(e.target.value)}
            >
                        Hard
            </button>
          </div>
        ) :
          ''
        }
      </div>
    )
  }

  return (
    <div className='main'>
      <h1>Memoria</h1>
      <PlayButton
        round={roundCount}
        time={timeLeft}
        roundTime={roundTime}
        selectionTime={selectionTime} 
        score={score}
        highScore={highScore}
      /> 
      <DifficultyButtons />
      {showScore ? (<FinalScore score={scoreToShow} />) : ''}
      <Board handleCellClick={handleCellClick} />
    </div>
  )
}

export default App