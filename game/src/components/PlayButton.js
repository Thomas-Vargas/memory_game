import React, { useState, useEffect, useCallback } from 'react'
import Display  from '../components/Display'

const PlayButton = () => {
    const [showButton, setShowButton] = useState(true)
    const [roundCount, setRoundCount] = useState(1)
    const [timeLeft, setTimeLeft] = useState(null)
    const [roundTime, setRoundTime] = useState(null)
    const [selectionTime, setSelectionTime] = useState(null)
    const [randomCells, setRandomCells] = useState([])
    const [userSelection, setUserSelection] = useState([])

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
            setUserSelection([])
            setTimeLeft(3)
            randomSelection()
            console.log(`Round: ${roundCount}`)
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
            let cells = document.getElementsByClassName('cell')
            for(let i = 0; i < cells.length; i++) {
                cells[i].disabled = false
            }
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

            if(roundCount <= 5) {
                setRoundCount(roundCount + 1)
                startGame()
            } else {
                //reset round count
                setRoundCount(1)
                setShowButton(true)
            }

            let cells = document.getElementsByClassName('cell')
            for(let i = 0; i < cells.length; i++) {
                cells[i].disabled = true
                cells[i].classList.remove('selected')
            }
        }

        //user selection
        let cells = document.getElementsByClassName('cell')
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', (e) => {
                let value = Number(e.target.value)
                if(userSelection.includes(value) === false && userSelection.length < 5) {
                    setUserSelection([...userSelection, value])
                }
                cells[i].classList.add('selected')
            })
        }

        if(!selectionTime) {
            return
        }

        const intervalId = setInterval(() => {
        setSelectionTime(selectionTime - 1)
        
        console.log(`user selected: `, {userSelection})
        }, 1000)
        return () => clearInterval(intervalId)
    }, [selectionTime, roundCount, startGame, userSelection])

    return (
        <div>
            {showButton ? (
                <button id='play-btn' className='play-btn' onClick={startGame}>
                    Play
                </button>
                ) : <Display round={roundCount} time={timeLeft} roundTime={roundTime} selectionTime={selectionTime} />
            }          
        </div>
    )
}

export default PlayButton
