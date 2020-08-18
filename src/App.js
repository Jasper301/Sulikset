import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const initjobs = [
    {
      "id": 1,
      "tyotehtava": "Lastenhoitaja"
    },
    {
      "id": 2,
      "tyotehtava": "Lakaisukoneen kuljettaja"
    },
    {
      "id": 3,
      "tyotehtava": "Sähköasentaja"
    }
  ]
  const [jobs, setJobs] = useState(initjobs);
  const rows = () => jobs.map(job => {
    return <p>{job.tyotehtava}</p>
  })
  return (
    <div className="App">
      <Header />
      {rows()}
    </div>
  );
}

export default App;
