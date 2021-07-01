import React, { useEffect, useState, Component } from 'react';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    response: '',
    post: '',
    responseToPost: '',
  });

  const [exercises, setExercises] = useState([]);


  const callApi = async () => {
    const response = await fetch('/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    
    return body;
  };

  useEffect( () => {
    return callApi()
      .then(res => setExercises(res))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...state, post: state.post }),
    });
    const body = await response.text();

    setState({...state, responseToPost: body });
  };

  const handleChange = e => setState({...state, post: e.target.value })

  return (
    <div className="App">
      <ul>{exercises.map(exercise => <li key={exercise.id}>{exercise.name}</li>)}</ul>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={state.post}
          onChange={handleChange}
        />
        <button className="btn" type="submit">Submit</button>
      </form>
      <p>{state.responseToPost}</p>
    </div>
  );
}

export default App;
