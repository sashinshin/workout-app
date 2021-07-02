import React from 'react';

const AddExercise = ({ updateExercises, toggle }) => {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const checkboxes = document.querySelectorAll('input[name="muscle"]:checked')
    const values = [];
    checkboxes.forEach(muscle => values.push(muscle.id));
    
    const newEx = {
      name: name,
      muscleTrained: values,
    };

    const response = await fetch('/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEx),
    });

    //show exercise added message
    const body = await response.text();
    console.log(body);
    toggle();
    updateExercises();
    
  };

  const muscleGroups = [
    "shoulders",
    "biceps",
    "triceps",
    "chest",
    "back",
    "legs",
  ]

  return (
    <div className="add-exercise">
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Add exercise:</strong>
        </p>
        <input
          id="name"
          type="text"
          placeholder="New exercise..."
          />
        <section className="add-exercise__input">
        {muscleGroups.map((value, key) => (<div key={key}><input type="checkbox" id={value} name="muscle" /> {value}</div>))}
        </section>
        <button className="btn"  type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddExercise;
