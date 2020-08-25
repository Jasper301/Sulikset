import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Jobs from './components/jobs';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Weather from './components/Weather';
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

  fetch('http://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
    .then(response => response.json())
    .then(json => setJobs([...json]));

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/weather">
          <Weather />
      </Route>
      <Route path="/">
        <Search />
        <Jobs jobs={jobs} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
