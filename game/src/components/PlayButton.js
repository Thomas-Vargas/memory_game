import React, { useState, useEffect, useCallback } from 'react'
import Timer from '../components/Timer'

const PlayButton = () => {
    const [showButton, setShowButton] = useState(true)
    const [roundCount, setRoundCount] = useState(1)
    const [timeLeft, setTimeLeft] = useState(null)
    const [roundTime, setRoundTime] = useState(null)
    const [selectionTime, setSelectionTime] = useState(null)
    const [randomCells, setRandomCells] = useState([])

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
            setTimeLeft(3)
            randomSelection()
            console.log(`Round: ${roundCount}`)
            setRoundCount(roundCount + 1)
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
            console.log(timeLeft)
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
            }
        }

        if(roundTime === 0) {
            console.log('round time left is 0')
            setRoundTime(null)
            setSelectionTime(3)
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
            if(roundCount <= 5) {
                startGame()
            } else {
                //reset round count
                setRoundCount(1)
                setShowButton(true)
            }
        }

        if(!selectionTime) {
            return
        }

        const intervalId = setInterval(() => {
        setSelectionTime(selectionTime - 1)
        console.log(selectionTime)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [selectionTime, roundCount, startGame])

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
