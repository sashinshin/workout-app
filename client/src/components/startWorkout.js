import  { React } from 'react';

const StartWorkout = ({ programs, start }) => {

  return (
    <div>
      <ul>Start workout from:
      <li><button className="btn" onClick={() => start([])}>Start from scratch!</button></li>
        {programs.map(program => (<li key={program.id}><button className="btn"  onClick={() => start(program)}>{program.name}</button></li>))}
      </ul>
    </div>
  );
}

export default StartWorkout;
