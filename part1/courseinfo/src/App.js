const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.partNumber} {props.numberOfExercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part partNumber={props.part1} numberOfExercises={props.exercises1} />
      <Part partNumber={props.part2} numberOfExercises={props.exercises2} />
      <Part partNumber={props.part3} numberOfExercises={props.exercises3} />
    </>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.exercisesCount}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name} exercises1={part1.exercises} 
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}
      />
      <Total exercisesCount={part1.exercises1 + part2.exercises2 + part3.exercises3} />
    </div>
  )
}

export default App