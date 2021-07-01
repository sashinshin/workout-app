import  { React } from 'react';
import { Link } from 'react-router-dom';

const StartWorkout = ({ programs, start }) => {
  console.log(programs);
  const emptyProgram = {
    name: '',
    exercises: [],
  }
  return (
    <div>
      <ul>Start workout from:
      <li><Link to="/"><button className="btn" onClick={() => start(emptyProgram)}>Start from scratch!</button></Link></li>
        {programs.map(program => (<li key={program.id}><Link to="/"><button className="btn"  onClick={() => start(program)}>{program.name}</button></Link></li>))}
      </ul>
    </div>
  );
}

export default StartWorkout;
