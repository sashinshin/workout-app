import React from 'react';

const ExerciseList = ({ exercises }) => {
  return (
    <div className="AddExercise">
      <ul>{exercises.map(exercise => <li key={exercise.id}>{exercise.name}: {exercise.muscleTrained.join(' ')}, id: {exercise.id}</li>)}</ul>
    </div>
  );
}

export default ExerciseList;
