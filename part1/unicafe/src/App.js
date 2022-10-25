import { useState } from 'react'
import './App.css'

// Define Button component
const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}> {text} </button>
  )
}

// Define StatisticLine component
const StatisticLine = (props) => {
  const {text, value} = props
  const percent = text === "positive" ? "%" : ""
  console.log(percent)
  return (
    // text === "positve" ? <p>{text} {value} %</p> : <p>{text} {value}</p>
    <tr>
      <td>{text}</td>
      <td>{value} {percent}</td>
    </tr>
  ) 
}

// Define Statistics component
const Statistics = (props) => {
  const {goodData, neutralData,badData} = props
  const all = goodData + neutralData + badData
  const average = (goodData*1 + badData*-1) / all
  const positivePercent = goodData * 100 / all
  if (goodData === 0 && neutralData === 0 && badData === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
      <StatisticLine text = "good" value = {goodData} />
      <StatisticLine text = "neutral" value = {neutralData} />
      <StatisticLine text = "bad" value = {badData} />
      <StatisticLine text = "all" value = {all} />
      <StatisticLine text = "average" value = {average} />
      <StatisticLine text = "positive" value = {positivePercent} />
      </tbody>
    </table>
  )
}


// Define App component
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div className='App'>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text="good"/>
      <Button handleClick={clickNeutral} text="neutral"/>
      <Button handleClick={clickBad} text="bad"/>
      <h2>statistics</h2>
      <Statistics goodData={good} neutralData={neutral} badData={bad}/>
    </div>
  )
}

export default App;
