const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

// const Part = () => {

// }

const Content = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course='Half Stack application development' />
      <Content 
        part1='Fundamentals of React' exercises1='10' 
        part2='Using props to pass data' exercises2='7'
        part3='State of a component' exercises3='14'
      />
      <Total exercisesCount={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App