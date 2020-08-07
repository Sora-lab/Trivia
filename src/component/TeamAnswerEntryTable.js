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

export default class TeamAnswerEntryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: this.props.round,
      roundLocked: null,
      teamAnswersNotes: null,
      rows: [],
      teamId: this.props.teamId,
    };
  }

  componentDidMount() {
    // console.log('componentDidMount answer entry table', this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   'componentDidUpdate',
    //   this.props,
    //   prevProps,
    //   'state',
    //   this.state
    // );
    if (this.props === prevProps) return;
    this.setState({
      rows: [],
    });
    this.getSnapshot(this.props);
  }

  async getSnapshot(props) {
    const roundNum = props.round;
    // console.log('getSnapshot', roundNum, this.state, props);
    const refPath = `/teams/${props.teamId}/rounds/${roundNum}`;
    const teamRoundInfo = await firebase.database().ref(refPath);
    teamRoundInfo.on('value', (snapshot) => {
      const teamRoundVal = snapshot.val();
      const answersNotes = teamRoundVal?.teamAnswersNotes;
      const roundLocked = teamRoundVal?.roundLocked;
      console.log(props.rows, roundNum, teamRoundVal, answersNotes, roundLocked)
      if (props.rows && props.rows[roundNum]) {
        const correctAnswerRows = props.rows[roundNum];
        if (answersNotes === null || answersNotes === undefined) {
          this.setState({
            round: roundNum,
            rows: correctAnswerRows,
            teamId: props.teamId,
            roundLocked: roundLocked,
          });
        } else {
          let newRows = [];
          correctAnswerRows.forEach((row) => {
            const qNum = row.number;
            let rowdata = {
              number: qNum,
            };
            // console.log(answersNotes, qNum, answersNotes[qNum], answersNotes.qNum)
            if (answersNotes && answersNotes[qNum]) {
              rowdata['teamAnswer'] = answersNotes[qNum].teamAnswer;
              rowdata['teamNote'] = answersNotes[qNum].teamNote;
            }
            newRows.push(rowdata);
          });
          this.setState({
            round: roundNum,
            rows: newRows,
            teamId: props.teamId,
            roundLocked: roundLocked,
          });
        }
      }
    });
  }

  handleOnChange(e, QNumber, field) {
    // console.log(this.state);
    // console.log('handleAnswerOnChange', QNumber, e.target.value);
    const round = this.state.round;
    const value = e.target.value;
    // const answerNotes = this.state.teamAnswersNotes[QNumber];
    const newValue = {};
    newValue[field] = value;
    const refPath = `/teams/${this.state.teamId}/rounds/${round}/teamAnswersNotes/${QNumber}`;
    firebase.database().ref(refPath).update(newValue);
  }


  handleOnLock() {
    const round = this.state.round;
    const refPath = `/teams/${this.state.teamId}/rounds/${round}/`;
    firebase.database().ref(refPath).update({
      roundLocked: true,
    });
  }

  render() {
    // console.log('render1', this.props, this.state, this.rows);
    // if (this.state.round === null) return null;
    // let rows = this.makeRows(this.props.round);
    // const rows = [{number: 'Q1'}, {number: 'Q1a'}];
    const rows = this.state.rows;
    const locked = this.state.roundLocked;
    // console.log('render', rows, locked);

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
                      onChange={(e) =>
                        this.handleOnChange(e, row.number, 'teamAnswer')
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Input
                      type="string"
                      value={row.teamNote}
                      onChange={(e) =>
                        this.handleOnChange(e, row.number, 'teamNote')
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Card>
          <h1 style={{color: 'red'}}>Lock your answer!</h1>
          <Switch
            checked={locked}
            disabled={locked}
            onChange={() => this.handleOnLock()}
            name="lock"
            inputProps={{'aria-label': 'primary checkbox'}}
          />
        </Card>
      </>
    );
  }
}
