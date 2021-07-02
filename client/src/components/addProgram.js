import React, { useState } from 'react';

const AddProgram = ({ exercises, updatePrograms, toggle }) => {
  const [program, updateProgram] = useState([]);
  const [currentExercise, changeExercise] = useState('');
  const [reps, selectReps] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    console.log("hello");
    changeExercise(e.target.id)
    console.log(currentExercise);
    selectReps(true);
  }

  const addSet = e => {
    e.preventDefault();
    const reps = document.getElementById('repsProgram').value;
    const weight = parseInt(document.getElementById('weight').value);
    const newEx = {
      name: currentExercise,
      reps: reps,
      weight: weight,
    };

    updateProgram([...program, newEx])
    console.log(newEx);
  }

  const removeSet = (event) => {
    //updateProgram(program.exercise.filter(current => exercise !== current))
    event.preventDefault();
    console.log(parseInt(event.target.id));
    const array = program;
    const index = parseInt(event.target.id);
    array.splice(index, 1);
    console.log(array);
    updateProgram([...array]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('program').value;
    if (name) {
      console.log(program);
  
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, exercises: program}),
      });
  
      //show exercise added message
      const body = await response.text();
      console.log(body);
      updatePrograms();
      toggle();

    }
  };

  const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

  return (
    <div className="add-program">
      <form class="card-container" onSubmit={handleSubmit}>
        <section className="card">
        <h3      className="card__title"><input 
  
          id="program"
          type="text"
          defaultValue="New workout"/></h3>
          <div className="card__content program-title">{program.map((exercise, index) => {
            return (<div>{capitalize(exercise.name)} x {exercise.reps} / {exercise.weight} kg<button className="btn btn-remove-set" id={index} onClick={removeSet}>Remove</button></div>)
            })}</div>
        </section>

        <section>

        {reps
        ? <div>{capitalize(currentExercise)}: <input id="repsProgram" type="number" min="1" max="99" defaultValue="1"></input> reps <input id="weight" type="number" min="1" max="999" defaultValue="20"></input> kg
        <button className="btn"  onClick={() => selectReps(false)}>Back</button>
        <button className="btn" onClick={addSet}>Add</button> </div>
        : exercises.map(value => (<div className="card card--add" id={value.name} onClick={handleClick}>{capitalize(value.name)}</div>))
        }
        </section>
        <button className="btn btn-submit-program" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProgram;
