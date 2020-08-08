import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import HostScorePage from './pages/HostScorePage';
import TeamPage from './pages/TeamPage';
import HomePage from './pages/HomePage';
import AnswerPage from './pages/AnswerPage';
import ScorePage from './pages/ScorePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/score" component={ScorePage} />
        <Route exact path="/host" component={HostScorePage} />
        <Route exact path="/answers" component={AnswerPage} />
        <Route path="/team/:teamId" component={TeamPage} />
      </div>
    </Router>
  );
}

export default App;
