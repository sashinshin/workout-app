import React, { useEffect, useState, Component } from 'react';
import './App.css';
import Navbar from './components/navbar';
import ExerciseList from './components/showExercises';
import ProgramList from './components/showPrograms';
import StartWorkout from './components/startWorkout';
import Workout from './components/workout';
import FinishedWorkouts from './components/finishedWorkouts';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [finished, setFinished] = useState([]);
  const [workoutStarted, toggleWorkingOut] = useState();

  const callExerciseApi = async () => {
    const response = await fetch('/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const updateExercises = async () => {
    const exerciseRes = await callExerciseApi();
    setExercises(exerciseRes);
  }

  const callProgramApi = async () => {
    const response = await fetch('/api/programs');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const updatePrograms = async () => {
    const programRes = await callProgramApi();
    setPrograms(programRes);
  }

  const callFinishedApi = async () => {
    const response = await fetch('/api/finishedworkouts');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  const resetState = async () => {
    try {
      const finishedRes = await callFinishedApi();
      setFinished(finishedRes)
      toggleWorkingOut(false)
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(async () => {
    try {
      const exerciseRes = await callExerciseApi();
      const programRes = await callProgramApi();
      const finishedRes = await callFinishedApi();
      setExercises(exerciseRes);
      setPrograms(programRes);
      setFinished(finishedRes)
      return;
    } catch (err) {
      return console.log(err);
    }
  }, []);

  const [programBase, chooseProgram] = useState([]);
 
  const chooseWorkout = (program) => {
    chooseProgram(program);
    toggleWorkingOut(true);
  }


  return (
    <Router>
      {workoutStarted
      ?<div className="wrapper main-container"><Workout resetState={resetState} program={programBase} exercises={exercises} workoutStarted={workoutStarted} /></div>
      :<div className="container">
        <main className="warpper main-container">
          <div className="push">
          <Switch>
            <Route exact path="/exercises">
              <ExerciseList exercises={exercises} updateExercises={updateExercises}/>
            </Route>
            <Route exact path="/programs">
              <ProgramList programs={programs} exercises={exercises} updatePrograms={updatePrograms}/>
            </Route>
            <Route path="/start">
              <StartWorkout programs={programs} start={chooseWorkout}/>
            </Route>
            <Route exact path="/">
              <FinishedWorkouts workouts={finished} />
            </Route>
          </Switch>
          </div>
        </main>
        <footer className="footer">
          <Navbar workoutStarted={workoutStarted}/>
        </footer>
      </div>
    }
    </Router>
  );
}

export default App;
