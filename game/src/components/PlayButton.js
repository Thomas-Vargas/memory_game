import React, { useState, useEffect, useCallback } from 'react'
import Display  from '../components/Display'

const PlayButton = () => {
    const [showButton, setShowButton] = useState(true)
    const [timeLeft, setTimeLeft] = useState(null)
    const [roundTime, setRoundTime] = useState(null)
    const [selectionTime, setSelectionTime] = useState(null)
    const [randomCells, setRandomCells] = useState([])
    const [userSelection, setUserSelection] = useState([])
    const [roundCount, setRoundCount] = useState(0)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const startGame = useCallback(
        () => {
            const randomSelection = () => {
                let selections = []
                while (selections.length < 5) {
                    let number = randomNumber(1, 25)
                    if (selections.includes(number) === false){
                        selections.push(number)
                    }
                }
                setRandomCells(selections)
            }
            setShowButton(false)
            setRoundCount(roundCount + 1)
            setUserSelection([])
            setTimeLeft(3)
            randomSelection()
            /*console.log(`Round: ${roundCount}`)*/
        },
        [roundCount]
    )

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
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
            setRoundTime(3)
        }
    
        if(!timeLeft) {
            changeCells()
            return
        }
    
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
            /*console.log(randomCells)*/
        }, 1000)
        return () => clearInterval(intervalId)
    }, [timeLeft, randomCells])

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
            } else {
                //reset game
                setHighScore(score)
                setScore(0)
                setRoundCount(0)
                setShowButton(true)
            }

            let cells = document.getElementsByClassName('cell')
            for(let i = 0; i < cells.length; i++) {
                cells[i].disabled = true
                cells[i].classList.remove('selected')
                cells[i].classList.add('hover')
            }
        }

        //user selection
        let cells = document.getElementsByClassName('cell')
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', (e) => {
                let value = Number(e.target.value)
                if(userSelection.includes(value) === false && userSelection.length < 5) {
                    setUserSelection([...userSelection, value])
                    cells[i].classList.add('selected')
                    cells[i].classList.remove('hover')
                } else {
                    let newArr = userSelection.filter(cell => cell !== value)
                    setUserSelection(newArr)
                    cells[i].classList.remove('selected')
                    cells[i].classList.add('hover')
                }
            })
        }

        if(!selectionTime) {
            return
        }

        const intervalId = setInterval(() => {
        setSelectionTime(selectionTime - 1)
        /*console.log(`user selected: `, {userSelection})*/
        }, 1000)
        return () => clearInterval(intervalId)
    }, [selectionTime, roundCount, startGame, userSelection, randomCells, score])

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

export default PlayButton
