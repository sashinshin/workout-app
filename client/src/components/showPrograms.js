import React from 'react';

const ProgramList = ({ programs }) => {

  console.log(programs);
  return (
    <div className="show-program">
      {programs.map(program => <ul key={program.id}><strong>{program.name}</strong>: {program.exercises.map(element => {
        return (<li>{element.name} * {element.reps} reps</li>)
        })}</ul>)}
    </div>
  );
}

export default ProgramList;
