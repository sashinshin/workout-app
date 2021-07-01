import  { React } from 'react';

const FinishedWorkouts = ({ workouts }) => {

  const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

  return (
    <div className="workout-container">
      {workouts.length > 0
      ?workouts.map(value => (
      <section className="card">
        <div className="card__title">
        <h3>{value.date}</h3>
        <p>{value.workoutStart}-{value.workoutEnd}</p>
        </div>
          <div className="card__content">{value.exercises.map(ex => (<div>{capitalize(ex.name)} x {ex.reps} / {ex.weight} kg </div>))}</div>
        </section>))
      :"No finished workouts :("}
    </div>
  );
}

export default FinishedWorkouts;
