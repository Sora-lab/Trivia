import React, {Component} from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import firebase from 'firebase';

import TeamAnswerEntryTable from '../component/TeamAnswerEntryTable';

export default class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.teamId = props.match.params.teamId
    this.state = {
      selectedTab: 0,
      teamNum: null,
      teamName: null,
      roundLocked: {},
    };
  }
  
  database = firebase.database();
  
  componentDidMount() {
    this.getSnapshot();
  }

  componentDidUpdate() {}

  async getSnapshot() {
    const snapshot = await firebase
      .database()
      .ref(`/teams/Team${this.teamId}`)
      // .ref(`/teams/${this.teamId}`)
      .once('value');
    const teamData = snapshot.val();
    const rounds = teamData.rounds;
    console.log('getSnapshot', rounds);
    let lockedRound = {};
    for (const key in rounds) {
      if (rounds.hasOwnProperty(key)) {
        const element = rounds[key];
        lockedRound[key] = element['locked'];
      }
    }
    this.setState({
      teamName: teamData.teamName,
      teamNum: teamData.teamNum,
      roundLocked: lockedRound,
    });
  }

  handleTabChange(event, newValue) {
    // console.log(event, newValue);
    this.setState({selectedTab: newValue});
  }

  render() {
    let roundLocked = this.state.roundLocked;
    let round = 'R' + this.state.selectedTab;
    // let locked = roundLocked[round];
    return (
      <div style={{margin: '32px', padding: '32px'}}>
        <h2>{this.state.teamName}</h2>
        <Tabs
          value={this.state.selectedTab}
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
        <TeamAnswerEntryTable
          locked={roundLocked[round]}
          round={this.state.selectedTab}
        />
      </div>
    );
  }
}
