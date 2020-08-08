import React, {Component} from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import firebase from 'firebase';

import TeamAnswerEntryTable from '../component/TeamAnswerEntryTable';

export default class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.teamId = props.match.params.teamId;
    this.state = {
      selectedTab: 0,
      teamName: null,
      rows: {},
      titles: [],
    };
  }

  database = firebase.database();

  componentDidMount() {
    this.getSnapshot();
    this.getAnswerSnapShot();
  }

  componentDidUpdate() {}

  async getSnapshot() {
    const snapshot = await firebase
      .database()
      .ref(`/teams/${this.teamId}`)
      .once('value');
    const teamData = snapshot.val();
    this.setState({
      teamName: teamData?.teamName || null,
      teamId: this.teamId,
    });
  }

  async getAnswerSnapShot() {
    const snapshot = await firebase.database().ref(`/answers/`).once('value');
    const answerSnapshot = snapshot.val();
    let roundRows = {};
    let titles = [];
    answerSnapshot.forEach((element, index) => {
      let rows = [];
      titles.push(element['roundTitle']);
      const answers = element['roundAnswers'];
      // console.log(answers);
      for (const key in answers) {
        let element = answers[key];
        rows.push({number: key, key: parseInt(element['sortOrder'])});
        roundRows[index] = rows;
      }
      // console.log(rows)
      rows.sort((a, b) => a.key - b.key);
      // console.log(rows)
    });
    this.setState({
      roundRows,
      titles,
    });
  }

  handleTabChange(event, newValue) {
    this.setState({selectedTab: newValue});
  }

  render() {
    let round = parseInt(this.state.selectedTab) + 1;
    const rows = this.state.roundRows;
    const teamId = this.state.teamId;
    const titles = this.state.titles;
    const selectedTab = this.state.selectedTab;
    // console.log(round, rows, teamId)
    return (
      <div style={{margin: '32px', padding: '32px'}}>
        <h2>{this.state.teamName}</h2>
        <h3>{titles[selectedTab]} Round</h3>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => this.handleTabChange(event, newValue)}
          aria-label="trivia rounds"
          style={{margin: '32px'}}
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
        <TeamAnswerEntryTable round={round} rows={rows} teamId={teamId} />
      </div>
    );
  }
}
