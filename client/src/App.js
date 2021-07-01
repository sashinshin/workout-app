import React, { useEffect, useState, Component } from 'react';
import './App.css';
import ExerciseList from './components/showExercises';
import AddExercise from './components/addExercise';
import ProgramList from './components/showPrograms';
import AddProgram from './components/addProgram';
import StartWorkout from './components/startWorkout';
import Workout from './components/workout';
import FinishedWorkouts from './components/finishedWorkouts';

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [finished, setFinished] = useState([]);

  const callExerciseApi = async () => {
    const response = await fetch('/api/exercises');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callProgramApi = async () => {
    const response = await fetch('/api/programs');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callFinishedApi = async () => {
    const response = await fetch('/api/finishedworkouts');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

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
  }


  return (
    <div className="App main-container">
      <main>
      <ExerciseList exercises={exercises} />
      <AddExercise/>
      <ProgramList programs={programs} />
      <AddProgram exercises={exercises} />
      <StartWorkout programs={programs} start={chooseWorkout}/>
      <Workout program={programBase} exercises={exercises} />
      <FinishedWorkouts workouts={finished} />
      </main>
    </div>
  );
}

export default App;
