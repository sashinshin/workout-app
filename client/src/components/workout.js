import  { React, useState } from 'react';

const Workout = ({ program, exercises }) => {
  const dummyProgram =[
    {
      name: "deadlift",
      reps: 5,
    }
  ]

  const [currentWorkout, updateWorkout] = useState(dummyProgram);
  const [currentExercise, changeExercise] = useState('');
  const [reps, selectReps] = useState(false);
  const workoutStart = new Date;

  const handleClick = e => {
    e.preventDefault();
    changeExercise(e.target.id)
    selectReps(true);
  }

  const addSet = e => {
    e.preventDefault();
    const reps = document.getElementById('repsWorkout').value;
    const newEx = {
      name: currentExercise,
      reps: reps,
    };
    updateWorkout([...currentWorkout, newEx]);
  }

  const removeSet = e => {
    const array = currentWorkout;
    const index = parseInt(e.target.id);
    array.splice(index, 1);
    console.log(array);
    updateWorkout([...array]);
  }

  const endWorkout = async (e) => {
    e.preventDefault();
    const workoutEnd = new Date;
    const finishedWorkout = {
      workoutStart: workoutStart, 
      workoutEnd: workoutEnd,
      exercises: [...currentWorkout],
    }

    const response = await fetch('/api/finishedworkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finishedWorkout),
    });
    const body = await response.text();
    console.log(body);
    console.log(finishedWorkout);
  }

  console.log(exercises);
  return (
    <div className="add-program">
      Hello in workout started
      <br />

      {currentWorkout.name ||  'New workout'}
      {<ul>{currentWorkout.map((element, index) =>  (<li>{element.name} reps:  {element.reps} <button className="btn" id={index} onClick={removeSet}>Remove set</button></li>))}</ul>}
      <ul>
      {reps
      ? <li>Add reps for {currentExercise} <input id="repsWorkout" type="number" min="1" max="99" defaultValue="1"></input><button className="btn" onClick={() => selectReps(false)}>Back</button><button className="btn" onClick={addSet}>Add</button> </li>
      : exercises.map(value => (<li><button className="btn"  type="button" id={value.name} onClick={handleClick}>{value.name}</button></li>))
      }
      </ul>
      <button className="btn" onClick={endWorkout}>Finish workout!</button>
    </div>
  );
}



export default Workout;
