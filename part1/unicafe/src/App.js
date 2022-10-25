import { useState } from 'react'
import './App.css'

const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}> {text} </button>
  )
}
const Statistic = (props) => {
  const {goodData, neutralData,badData} = props
  const all = goodData + neutralData + badData
  const average = (goodData*1 + badData*-1) / all
  const positvePercent = goodData * 100 / all
  return(
    <div>
      <h2>statistics</h2>
      <p>good {goodData}</p>
      <p>neutral {neutralData}</p>
      <p>bad {badData}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positve {positvePercent} %</p>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const clickGood = () => {
    setGood(good + 1)
  } 
  const clickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const clickBad = () => {
    setBad(bad + 1)
  }
  return (
    <div class='App'>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text="good"/>
      <Button handleClick={clickNeutral} text="neutral"/>
      <Button handleClick={clickBad} text="bad"/>
      <Statistic goodData={good} neutralData={neutral} badData={bad}/>
    </div>
  )
}

export default App;
