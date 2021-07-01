import { React, useState } from 'react';
import AddExercise from './addExercise';

const ExerciseList = ({ exercises, updateExercises }) => {
  const [exerciseButton, toggleExerciseButton] = useState(false);

  const toggle = () => toggleExerciseButton(false);

  return (
    <div className="AddExercise">
      <ul>{exercises.map(exercise => <li key={exercise.id}>{exercise.name}: {exercise.muscleTrained.join(' ')}</li>)}</ul>
      <button onClick={() => toggleExerciseButton(!exerciseButton)}>{exerciseButton ? 'Exit' : 'Add'}</button>
      {exerciseButton
        ?<AddExercise updateExercises={updateExercises} toggle={toggle}/>
        : ''}
    </div>
  );
}

export default ExerciseList;
