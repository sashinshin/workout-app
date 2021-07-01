import React from 'react';

const AddExercise = () => {
  const handleSubmit = async e => {
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
    <div className="AddExercise">
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Add exercise:</strong>
        </p>
        <input
          id="name"
          type="text"
          />
        <ul>
        {muscleGroups.map(value => (<li>{value}<input type="checkbox" id={value} name="muscle" /></li>))}
        </ul>
        <button className="btn"  type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddExercise;
