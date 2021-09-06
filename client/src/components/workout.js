import  { React, useState } from 'react';

const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

const Workout = ({ program, exercises, resetState }) => {
  const [currentWorkout, updateWorkout] = useState(program);
  const [currentExercise, changeExercise] = useState('');
  const [reps, selectReps] = useState(false);
  const workoutStart = new Date();

  const handleClick = e => {
    e.preventDefault();
    changeExercise(e.target.id)
    selectReps(true);
  }

  const addSet = e => {
    e.preventDefault();
    const reps = document.getElementById('repsWorkout').value;
    const weight = document.getElementById('weightWorkout').value;
    const newEx = {
      name: currentExercise,
      reps: reps,
      weight: weight,
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
      const reps = parseInt(document.getElementById(`reps${index}`).value)
      finishedArray.push({...element, weight: weight, reps: reps})
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
    <div className="workout-container">
    <div className="card--start card">
      <button className="btn btn-submit-program" onClick={endWorkout}>Finish workout!</button>
      <div className="card__title card__title--start"><h3>{currentWorkout.name ||  'New workout'}</h3></div>
      {currentWorkout.exercises
      ?<div className="card__content card_content--start">{currentWorkout.exercises.map((element, index) =>  
        (<div>{capitalize(element.name)}: <input id={"reps" + index} type="number" defaultValue={element.reps} min="1" max="99"></input> reps <input id={"weight" + index} type="number" defaultValue={element.weight} min="1" max="999"></input> kg
        <button className="btn btn-remove" id={index} onClick={removeSet}>Remove</button>
        </div>))}</div>
      :'Add an exercise!'
    }
    </div>
    <div>
      {reps
      ? <div>
      {capitalize(currentExercise)}: <input id="repsWorkout" type="number" min="1" max="99" defaultValue="1"></input> reps <input id="weightWorkout" type="number" min="1" max="999" defaultValue="20"></input> kg
      <button className="btn btn-exit" onClick={() => selectReps(false)}>Back</button>
      <button className="btn" onClick={addSet}>Add</button>
      </div>
      : (<div><strong>Add:</strong> {exercises.map(value => (<div className="card card--add" id={value.name} onClick={handleClick}>{capitalize(value.name)}</div>))}</div>)
      }
      </div>
    </div>
  );
}



export default Workout;
