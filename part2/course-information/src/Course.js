const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </>

const Course = ({course}) => {
  const exerciseSum = course.parts.map(part => part.exercises).reduce((a,b) => a + b,0);
  return (
    <>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total sum = {exerciseSum}/>
    </>
  )
}

export default Course