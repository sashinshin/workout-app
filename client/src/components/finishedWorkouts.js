import  { React } from 'react';

const FinishedWorkouts = ({ workouts }) => {

  console.log(workouts);

  return (
    <div>
        {workouts.map(value => (<section>
        Workout start: {value.workoutStart}
          <br />
        Workout end: {value.workoutEnd}
          <ul>{value.exercises.map(ex => (<li>{ex.name} * {ex.reps} reps</li>))}</ul>
        </section>
        ))}
    </div>
  );
}

export default FinishedWorkouts;
