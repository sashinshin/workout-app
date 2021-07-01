import  { React, useState } from 'react';

const Workout = ({ program, exercises, resetState }) => {
  const dummyProgram =[
    {
      name: "deadlift",
      reps: 5,
    }
  ]

  const [currentWorkout, updateWorkout] = useState(program);
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
    updateWorkout({...currentWorkout, exercises: [...currentWorkout.exercises, newEx]});
  }

  const removeSet = e => {
    console.log(currentWorkout);
    const array = currentWorkout.exercises;
    const index = parseInt(e.target.id);
    array.splice(index, 1);
    console.log(array);
    updateWorkout({...currentWorkout, exercises: array});
  }

  const endWorkout = async (e) => {
    e.preventDefault();
    const workoutEnd = new Date();
    
    console.log(currentWorkout);
    const exArray = currentWorkout.exercises;
    const finishedArray = [];
    exArray.forEach((element, index) => {
      const weight = parseInt(document.getElementById(`weight${index}`).value);
      finishedArray.push({...element, weight: weight})
    });

    const finishedWorkout = {
      name: currentWorkout.name,
      workoutStart: workoutStart, 
      workoutEnd: workoutEnd,
      exercises: [...finishedArray],
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
    resetState();
  }

  return (
    <div className="add-program">
      <button className="btn finish-workout" onClick={endWorkout}>Finish workout!</button>
      <h3>{currentWorkout.name ||  'New workout'}</h3>
      {currentWorkout.exercises
      ?<ul>{currentWorkout.exercises.map((element, index) =>  (<li>{
        element.name} reps:  {element.reps} weight: 
        <input id={"weight" + index} type="number" defaultValue={element.weight} min="1" max="999"></input> kg
        <button className="btn" id={index} onClick={removeSet}>Remove set</button>
        </li>))}</ul>
      :'Add an exercise!'
    }<ul>
      {reps
      ? <li>Add reps for {currentExercise} <input id="repsWorkout" type="number" min="1" max="99" defaultValue="1"></input><button className="btn" onClick={() => selectReps(false)}>Back</button><button className="btn" onClick={addSet}>Add</button> </li>
      : exercises.map(value => (<li><button className="btn"  type="button" id={value.name} onClick={handleClick}>{value.name}</button></li>))
      }
      </ul>
    </div>
  );
}



export default Workout;
