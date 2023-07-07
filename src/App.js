
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { getRoutines } from './api';
import { useState, useEffect } from 'react';
import {
  Routines,
  Login
 } from './components';


function App() {
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchRoutines = async () => {
      const data = await getRoutines();
      setRoutines(data);
    }

    fetchRoutines();

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

 

  return (
    <div className="App">
      <header>
      <h1>Fitness Tracker </h1>
      <p>{token}</p>
      <nav>
        {!token && <Link to="/login">Login </Link>} |
        <Link to="/nonexistent">Nowhere </Link> |
        <Link to="/routines">Routines </Link> |
      </nav>
      </header>
     
      <Routes>
        <Route path='/' element={<h2>Home</h2>}/>
        <Route path='/login' element={<Login token={token} setToken={setToken} />} />
        <Route path='/routines' element={<Routines token={token} routines={routines}/>} />
        <Route path='*' element={<h2>404 not found! Try again </h2>} />
      </Routes>
      
    </div>
  );
}

export default App;
