import React from 'react'
import './App.css'
import Board from './components/Board'
import Footer from './components/Footer'
import PlayButton from './components/PlayButton'

function App() {

  return (
    <div className='main'>
      <h1>Memory Game</h1>
      <PlayButton /> 
      <Board />
      <Footer />
    </div>
  )
}

export default App
