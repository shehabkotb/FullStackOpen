import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
      <td>{props.symbol}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const positivePercent = (good / total) * 100;

  if ((good || neutral || bad) === 0) {
    return (
      <div>
        <Header name={"give feedback"} />
        <Button handleClick={() => setGood(good + 1)} text={"good"} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
        <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
        <Header name={"Statistics"} />
        <p>No Feedback is given</p>
      </div>
    );
  } else {
    return (
      <div>
        <Header name={"give feedback"} />
        <Button handleClick={() => setGood(good + 1)} text={"good"} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
        <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
        <Header name={"Statistics"} />
        <table>
          <Statistic name={"good"} value={good} />
          <Statistic name={"neutral"} value={neutral} />
          <Statistic name={"bad"} value={bad} />
          <Statistic name={"all"} value={total} />
          <Statistic name={"average"} value={avg} />
          <Statistic name={"positive"} value={positivePercent} symbol={"%"} />
        </table>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
