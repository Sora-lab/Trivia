import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import firebase from 'firebase';

import rossConsole from '../utils/consoleExtensions';

export default class ScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      sortOrder: 'ascending',
    };
  }
  componentDidMount() {
    this.getSnapshot();
  }
  componentDidUpdate() {}

  async getSnapshot() {
    const refPath = `/teams`;
    const teams = await firebase.database().ref(refPath);
    console.assert(teams, 'Error fetching teams');
    teams.on('value', (snapshot) => {
      this.makeRows(snapshot.val());
    });
  }

  makeRows(teamVal) {
    // Precondtion asserts.
    // console.assert(teamVal, "Error in makeRows: Param invalid");
    // console.assert(typeof teamVal === 'string', "Error in makeRows: make rows should be string", teamVal);
    // console.preconditions.assertIsString(teamVal, 'makeRows');
    // rosstriv.assertIsString(teamVal);
    // rosstriv.assertIsNotEmptyString(teamVal);

    let rows = [];
    // rossConsole.assertNotNullOrUndefined(rows);
    // rossConsole.assertNonEmptyArray(rows);
    // rossConsole.assertTypeOf(rows, 'boolean');
    // rossConsole.assertNonEmptyString(rows);
    // alert(JSON.stringify(teamVal))
    // console.log(teamVal)
    rows = teamVal.map((team, index) => {
      return this.teamScore(team, index);
    });
    // console.log(rows)
    // Postcondtion asserts.
    console.assert(rows, 'Error in makeRows: return value in not defined!');
    this.setState({rows});
    // return rows;
  }

  teamScore(team, index) {
    let teamInfo = {
      teamName: team?.teamName ? team.teamName : '',
      key: index,
    };
    let totalScore = 0;
    let rounds = team?.rounds;
    if (rounds) {
      rounds.forEach((round, index) => {
        const answers = round.teamAnswersNotes;
        let roundSore = this.roundScore(answers);
        teamInfo[`round${index}`] = roundSore;
        totalScore += roundSore;
      });
    }
    teamInfo['totalScore'] = totalScore;
    return teamInfo;
  }
  /**
   * docs
   * @param {*} answers
   */
  roundScore(answers) {
    let points = 0;
    for (const key in answers) {
      if (answers.hasOwnProperty(key)) {
        const answer = answers[key];
        points += answer.points ? answer.points : 0;
      }
    }
    return points;
  }

  sortTable(columnId){
    const rows = this.state.rows;
    let sortOrder = this.state.sortOrder;
    if(sortOrder === 'ascending'){
      rows.sort((a, b)=>a[columnId] -b[columnId]);
      sortOrder = 'descending';
    } else {
      rows.sort((a, b)=>b[columnId]-a[columnId]);
      sortOrder = 'ascending';
    }
    this.setState({rows, sortOrder})
  }

  columns = [
    {
      id: 'teamName',
      key: 'teamName',
      label: 'Team',
      minWidth: 170,
    },
    {
      id: 'totalScore',
      key: 'totalScore',
      label: 'Total Score',
      minWidth: 100,
    },
    {
      id: 'round1',
      key: 1,
      label: 'Round 1',
      align: 'center',
    },
    {
      id: 'round2',
      key: 2,
      label: 'Round 2',
      align: 'center',
    },
    {
      id: 'round3',
      key: 3,
      label: 'Round 3',
      align: 'center',
    },
    {
      id: 'round4',
      key: 4,
      label: 'Round 4',
      align: 'center',
    },
    {
      id: 'round5',
      key: 5,
      label: 'Round 5',
      align: 'center',
    },
    {
      id: 'round6',
      key: 6,
      label: 'Round 6',
      align: 'center',
    },
    {
      id: 'round7',
      key: 7,
      label: 'Round 7',
      align: 'center',
    },
    {
      id: 'round8',
      key: 8,
      label: 'Round 8',
      align: 'center',
    },
  ];
  // rows = [
  //   {
  //     teamName: 'foo',
  //     totalScore: 199,
  //     round1: 3,
  //     round2: 1,
  //     round3: 5,
  //   },
  //   {
  //     teamName: 'boo',
  //     totalScore: 199,
  //     round1: 3,
  //     round2: 1,
  //     round3: 5,
  //   },
  // ];
  render() {
    const rows = this.state.rows;
    return (
      <div style={{margin: '3em', padding: '2em', background: '#c2d1e8'}}>
        <header style={{padding: '2em', fontFamily: "'Rock Salt', cursive"}}>
          <h2>Score Card</h2>
        </header>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.columns.map((column) => {
                    return (
                      <TableCell
                        key={column.key}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                      >
                        <TableSortLabel onClick={()=>this.sortTable(column.id)}>{column.label}</TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                      {this.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}
