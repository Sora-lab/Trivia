import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import HostScorePage from './pages/HostScorePage';
import TeamPage from './pages/TeamPage';

function App() {
 
  return (
    <Router>
      <div className="App">
        <Route exact path="/host" component={HostScorePage} />
        <Route path="/team/:teamId" component={TeamPage} />
      </div>
    </Router>
  );
}

export default App;
