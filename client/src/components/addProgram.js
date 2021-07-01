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

  //   const test = program;

  //   test.sort((a, b) => {
  //     if(a.name < b.name) { return -1; }
  //     if(a.name > b.name) { return 1; }
  //     return 0;
  // })

  // console.log(test);

    updateProgram([...program, newEx])
    console.log(newEx);
  }

  const removeSet = (event) => {
    //updateProgram(program.exercise.filter(current => exercise !== current))
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
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Add program:</strong>
        </p>
        <input
          id="program"
          type="text"
          defaultValue="New workout"
          />
        <ul>

        {reps
        ? <li>Add reps for {currentExercise} 
        <input id="repsProgram" type="number" min="1" max="99" defaultValue="1"></input>
        weight
        <input id="weight" type="number" min="1" max="999" defaultValue="20"></input>
        <button className="btn"  onClick={() => selectReps(false)}>Back</button>
        <button onClick={addSet}>Add</button> </li>
        : exercises.map(value => (<li><button className="btn" type="button" id={value.name} onClick={handleClick}>{value.name}</button></li>))
        }
        </ul>
        <button className="btn" type="submit">Submit</button>
      </form>
        <ul>Current program:
        {program.map((exercise, index) => {
          return (<li>{capitalize(exercise.name)}: {exercise.reps} reps // {exercise.weight} kg<button className="btn" id={index} onClick={removeSet}>Remove set</button></li>)
          })}
      </ul>
    </div>
  );
}

export default AddProgram;
