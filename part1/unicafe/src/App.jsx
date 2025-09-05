import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => <div>{text + " " + value}</div>;

const Statistics = ({ good, bad, neutral }) => {
  return (
    <>
      <h2>statistics</h2>
      {good !== 0 || bad !== 0 || neutral !== 0 ? (
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + bad + neutral} />
          <StatisticLine
            text="average"
            value={(good * 1 + bad * -1) / (good + bad + neutral)}
          />
          <StatisticLine
            text="positve"
            value={(good / (good + bad + neutral)) * 100}
          />
        </>
      ) : (
        <div>No feedback given</div>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
