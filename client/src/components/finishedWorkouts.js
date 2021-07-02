import  { React } from 'react';

const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

const FinishedWorkouts = ({ workouts }) => {

  return (
    <div className="workout-container">
      <h3>Completed workouts:</h3>
      {workouts.length > 0
      ?workouts.map(value => (
      <section className="card">
        <div className="card__title">
        <h3>{value.date}</h3>
        <p>{value.workoutStart}-{value.workoutEnd}</p>
        </div>
          <div className="card__content">{value.exercises.map(ex => (<div>{capitalize(ex.name)} x {ex.reps} / {ex.weight} kg </div>))}</div>
        </section>))
      :<div className="card">Nothing to see 😢 </div>}
    </div>
  );
}

export default FinishedWorkouts;
