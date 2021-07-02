import  { React } from 'react';
import { Link } from 'react-router-dom';

const StartWorkout = ({ programs, start }) => {
  console.log(programs);
  const emptyProgram = {
    name: '',
    exercises: [],
  }
  return (
    <section className="card">
      <div className="card__title"><h3>Start Workout</h3></div>
      <div><Link to="/"><button className="btn" onClick={() => start(emptyProgram)}>From scratch!</button></Link></div>
      {programs.map(program => (<div key={program.id}><Link to="/"><button className="btn"  onClick={() => start(program)}>{program.name}</button></Link></div>))}
    </section>
  );
}

export default StartWorkout;
