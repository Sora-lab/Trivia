import React, {Component} from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ScoreTabConent from '../component/ScoreTabConent';

import firebase from 'firebase';

export default class HostScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      answerRows: null,
      titles: null,
      teams: null,
    };
  }
  componentDidMount() {
    // console.log(answerSnapshot.allAnswers);
    this.getSnapshots();
  }
  componentDidUpdate() {
    // console.log(answerSnapshot.allAnswers);
  }
  async getSnapshots() {
    const teamSnapshotVal = await firebase
      .database()
      .ref(`/teams/`)
      .once('value');
    const answerSnapshotVal = await firebase
      .database()
      .ref(`/answers/`)
      .once('value');
    const teamSnapshot = teamSnapshotVal.val(); //Array of Object
    const answerSnapshot = answerSnapshotVal.val(); //Array of Object

    let teams = new Map();
    teamSnapshot.forEach((team, index) => {
      teams.set(index, team['teamName']);
    });

    let answerRows = new Map();
    let titles = new Map();
    answerSnapshot.forEach((round, index) => {
      titles.set(index, round['roundTitle']);
      // console.log(element, index)
      const answers = round['roundAnswers'];
      let rows = [];
      for (const key in answers) {
        let element = answers[key];
        rows.push({
          number: key,
          key: parseInt(element['sortOrder']),
          answer: element['answer'],
        });
        answerRows[index] = rows;
      }
      rows.sort((a, b) => a.key - b.key);
      answerRows.set(index, rows);
      //   console.log(rows)
    });
    this.setState({
      answerRows,
      titles,
      teams,
    });
  }

  handleTabChange(event, newValue) {
    // console.log(event, newValue);
    this.setState({selectedTab: newValue});
  }
  render() {
    const titles = this.state.titles;
    const round = parseInt(this.state.selectedTab) + 1;
    const allAnswerRows = this.state.answerRows;
    const title = titles ? titles.get(round) : '';
    const rows = allAnswerRows && round ? allAnswerRows.get(round) : [];
    const teams = this.state.teams;
    // console.log(title, round, rows, teams)
    if(teams === null){
     return null;
    } else {
    return (
      <div style={{margin: '32px', padding: '32px'}}>
        <Tabs
          value={this.state.selectedTab}
          onChange={(event, newValue) => this.handleTabChange(event, newValue)}
          aria-label="trivia rounds"
        >
          <Tab label="Round 1" value={0} />
          <Tab label="Round 2" value={1} />
          <Tab label="Round 3" value={2} />
          <Tab label="Round 4" value={3} />
          <Tab label="Round 5" value={4} />
          <Tab label="Round 6" value={5} />
          <Tab label="Round 7" value={6} />
          <Tab label="Round 8" value={7} />
        </Tabs>
        <div style={{paddingTop: '16px'}} role="tabpanel">
          <ScoreTabConent
            title={title}
            round={round}
            answerRows={rows}
            teams={teams}
          />
        </div>
      </div>
    );
  }
  }
}
