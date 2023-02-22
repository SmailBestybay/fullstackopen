import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text, number}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props.statistics
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  if (all === 0) {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    )
  }

  return (
    <table>
        <tbody>
          <StatisticsLine text='good' number={good}/>
          <StatisticsLine text='neutral' number={neutral}/>
          <StatisticsLine text='bad' number={bad}/>
          <StatisticsLine text='all' number={all}/>
          <StatisticsLine text='average' number={average}/>
          <StatisticsLine text='positive' number={positive}/>
        </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
  }
  console.log(good, neutral, bad)


  return (
    <>
      <Header text='give feedback' />
      <div>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <Header text='statistics' />
      <Statistics statistics={statistics}/>
    </>
  )
}

export default App