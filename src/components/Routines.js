 import React, {useState} from 'react';
import { createRoutine } from '../api';
 

 const Routines = ({routines, token}) => {
  const [showCreate, setShowCreate] = useState(false);

  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(true);


    return <>
    <h2>Routines</h2>
    {token && <button width="25px" height="25px" onClick={() => {setShowCreate(!showCreate)}}>
      {showCreate ? '-' : '+'}
    </button>}
    {showCreate && <div>
    <h3>Create Routine </h3>
      <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          const data = await createRoutine({name, goal, isPublic}, token)
          console.log(data); 
        } catch (err) {
          console.log(err);
        }
      }}>
       <label>Name: </label> <br/>
       <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
       <label>Goal: </label> <br/>
       <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} /><br />
       <label> Public </label>
       <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
      <br/>
      <button>Create</button>
      
      </form>
    </div>}
    {
      routines.map((routine, index) => {
        return<div key={index}>
          <h3 >{routine.name}</h3>
          <p>{routine.goal}</p>
          <p>Created By: {routine.creatorName}</p>
          </div>
      })
    }
    
    </>
 }

 export default Routines;