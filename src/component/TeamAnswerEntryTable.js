import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import firebase from 'firebase';
// import {ScriptSnapshot} from 'typescript';

// import 'firebase/firestore';

export default class TeamAnswerEntryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: null,
      locked: null,
      teamAnswersNotes: null,
      rows: [],
    };
  }

  componentDidMount() {
    // console.log('componentDidMount', this.props.round);
    this.getSnapshot(this.props.round, this.props.locked);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', this.props.round, prevProps, this.state);
    if (this.props.round !== prevProps.round) {
      this.getSnapshot(this.props.round, this.props.locked);
    }
  }

  async getSnapshot(roundNum, locked) {
    const round = 'R' + (roundNum + 1).toString();
    firebase
      .database()
      .ref('/teams/' + 'Team1' + '/rounds/' + round + '/teamAnswersNotes')
      .on('value', (snapshot) => {
        // console.log('getSnapshot', snapshot.val());
        const teamAnswersNotes = snapshot.val();
        this.setState({
          round: roundNum,
          teamAnswersNotes,
          locked,
        });
      });
  }

  handleAnswerOnChange(e, QNumber) {
    // console.log('handleAnswerOnChange', QNumber, e.target.value);
    const value = e.target.value;
    const QNum = 'Q' + QNumber.toString();
    const answerNotes = this.state.teamAnswersNotes[QNum];
    const round = 'R' + (this.state.round + 1).toString();
    const refPath = `/teams/Team1/rounds/${round}/teamAnswersNotes/${QNum}`;
    firebase.database().ref(refPath).set({
      teamAnswer: value,
      teamNote: answerNotes['teamNote'],
    });
  }

  handleNoteOnChange(e, QNumber) {
    // console.log('handleNoteOnChange', QNumber, e.target.value);
    const value = e.target.value;
    const QNum = 'Q' + QNumber.toString();
    const answerNotes = this.state.teamAnswersNotes[QNum];
    const round = 'R' + (this.state.round + 1).toString();
    const refPath = `/teams/Team1/rounds/${round}/teamAnswersNotes/${QNum}`;
    firebase.database().ref(refPath).set({
      teamAnswer: answerNotes['teamAnswer'],
      teamNote: value,
    });
  }

  makeRows() {
    const teamAnswersNotes = this.state.teamAnswersNotes;
    let rows = [];
    for (const key in teamAnswersNotes) {
      if (teamAnswersNotes.hasOwnProperty(key)) {
        const element = teamAnswersNotes[key];
        rows.push({
          number: key.slice(1), //get rid of Q
          teamAnswer: element['teamAnswer'],
          teamNote: element['teamNote'],
        });
      }
    }
    return rows;
  }

  handleOnLock() {
    const round = 'R' + (this.state.round + 1).toString();
    const refPath = `/teams/Team1/rounds/${round}/locked`;
    // firebase
    //   .database()
    //   .ref(refPath)
    //   .on('value', (snapshot) => {
    //     console.log('handleOnLock', snapshot.val());
    //   });
    // firebase.database().ref(refPath).set({
    //   teamAnswer: answerNotes['teamAnswer'],
    //   teamNote: value,
    // });
    this.setState({locked: true});
  }

  render() {
    // console.log('render1', this.props, this.state, this.rows);
    if (this.state.round === null) return null;
    let rows = this.makeRows(this.props.round);
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="answer table">
            <TableHead>
              <TableRow>
                <TableCell>Q #</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.number}>
                  <TableCell component="th" scope="row">
                    {row.number}
                  </TableCell>
                  <TableCell align="left">
                    <Input
                      disabled={this.state.locked}
                      type="string"
                      value={row.teamAnswer}
                      onChange={(e) => this.handleAnswerOnChange(e, row.number)}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Input
                      type="string"
                      value={row.teamNote}
                      onChange={(e) => this.handleNoteOnChange(e, row.number)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Card>
          <h1 style={{color: 'red'}}>Lock your answer!</h1>
          <p>Once you lock it, I cannot undo it for you.</p>
          <Switch
            checked={this.state.locked}
            onChange={() => this.handleOnLock()}
            name="checkedA"
            inputProps={{'aria-label': 'secondary checkbox'}}
          />
        </Card>
      </>
    );
  }
}