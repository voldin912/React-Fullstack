
import './App.css';
import { useState } from 'react'

const AnecdoteDisplay = (props) => {
    const {anecdote, point} = props
    return (
      <>
      {anecdote}
      <p>has {point} votes</p>
      </>
    )
}

const Button = (props)  => {
  const {text, handleClick} = props
  return ( 
    <button onClick = {handleClick}>{text}</button>
  )
}


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({
    0:0,1:0,2:0,3:0,4:0,5:0,6:0
  })
  const addVote = () => {
    const copy  = {...points}
    copy[selected] += 1
    setPoints(copy)
  }
  const nextAnecdotes = () => {
    const randomNum = Math.floor(Math.random() * 7);
    setSelected(randomNum)
  }
  const findMaxVote = () => {
    const voteArr = Object.values(points)
    const maxArrKey = Object.keys(points).find(key => points[key] === Math.max(...voteArr))
    return maxArrKey
  }
  const maxVoteResult = findMaxVote()
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay anecdote={anecdotes[selected]} point={points[selected]}/>
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={nextAnecdotes} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <AnecdoteDisplay anecdote={anecdotes[maxVoteResult]} point={points[maxVoteResult]}/>
    </div>
  );
}

export default App;
