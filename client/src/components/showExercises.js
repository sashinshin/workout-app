import { React, useState } from 'react';
import AddExercise from './addExercise';

const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

const ExerciseList = ({ exercises, updateExercises }) => {
  const [exerciseButton, toggleExerciseButton] = useState(false);

  const toggle = () => toggleExerciseButton(false);

  return (
    <div className="show-exercise">
      <div>{exercises.map(exercise => <div className="exercise" key={exercise.id}><h3>{capitalize(exercise.name)}</h3><p>{exercise.muscleTrained.join(', ')}</p></div>)}</div>
      <button className="btn toggle" onClick={() => toggleExerciseButton(!exerciseButton)}>{exerciseButton ? 'Exit' : 'Add'}</button>
      {exerciseButton
        ?<AddExercise updateExercises={updateExercises} toggle={toggle}/>
        : ''}
    </div>
  );
}

export default ExerciseList;
