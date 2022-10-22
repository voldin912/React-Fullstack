const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.partName} {props.partExercise}</p>
  )
}

const Content =  (props) => {
  return(
    <div>
      <Part partName = {props.part1} partExercise= {props.exercises1}/>
      <Part partName = {props.part2} partExercise= {props.exercises2}/>
      <Part partName = {props.part3} partExercise= {props.exercises3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.totalExercise}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header courseName = {course}/>
      <Content 
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}/>
      <Total totalExercise={exercises1 + exercises2 + exercises3}/>
  </div>
  );
}

export default App;
