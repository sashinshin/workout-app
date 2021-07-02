import { React, useState } from 'react';
import AddProgram from './addProgram';

const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

const ProgramList = ({ programs, exercises, updatePrograms }) => {
  const [programButton, toggleProgramButton] = useState(false);

  const toggle = () => toggleProgramButton(false);

  return (
    <div className="show-program">
        {programButton
        ?<AddProgram exercises={exercises} toggle={toggle} updatePrograms={updatePrograms} />
        :programs.map(program => <section className="card" key={program.id}><div className="card__title"><h3>{program.name}</h3></div><div className="card__content card--program">{program.exercises.map(element => {
          return (<div>{capitalize(element.name)} x {element.reps} / {element.weight} kg</div>)
          })}</div></section>)}
        <button className={programButton ? 'btn btn-exit' : 'btn' } onClick={() => toggleProgramButton(!programButton)}>{programButton ? 'Exit' : 'Add'}</button>
    </div>
  );
}

export default ProgramList;
