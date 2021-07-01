import { React, useState } from 'react';
import AddProgram from './addProgram';

const ProgramList = ({ programs, exercises, updatePrograms }) => {
  const [programButton, toggleProgramButton] = useState(false);

  const toggle = () => toggleProgramButton(false);

  return (
    <div className="show-program">
        {programButton
        ?<AddProgram exercises={exercises} toggle={toggle} updatePrograms={updatePrograms} />
        :programs.map(program => <ul key={program.id}><strong>{program.name}</strong>: {program.exercises.map(element => {
          return (<li>{element.name} * {element.reps} reps / {element.weight} kg</li>)
          })}</ul>)}
        <button onClick={() => toggleProgramButton(!programButton)}>{programButton ? 'Exit' : 'Add'}</button>
    </div>
  );
}

export default ProgramList;
