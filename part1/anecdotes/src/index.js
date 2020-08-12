import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(6).fill(0));

  const min = Math.ceil(0);
  const max = Math.floor(5);
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;

  // makes sure to not display same anecdote
  while (rand === selected) {
    rand = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const vote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };

  let highestVoteIndex = votes.indexOf(Math.max.apply(Math, votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={() => setSelected(rand)}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <Anecdote anecdote={props.anecdotes[highestVoteIndex]} votes={votes[highestVoteIndex]} />
    </div>
  );
};

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
