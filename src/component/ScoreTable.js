import React, {Component} from 'react';

import firebase from 'firebase';

import {forwardRef} from 'react';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Typography from '@material-ui/core/Typography';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      round: null,
      answerRows: null,
      teamName: null,
      teamId: null,
      rows: null,
      locked: null,
      points: null,
    };
  }

  componentDidMount() {
    // console.log('scoreTable mount', this.props.teamId);
    if (this.props.answerRows !== undefined) {
      const title = this.props.title;
      const round = this.props.round;
      const answerRows = this.props.answerRows;
      const teams = this.props.teams;
      const teamId = this.props.teamId;
      const teamName = teams.get(teamId);
      this.setState({
        title: title,
        round: round,
        answerRows: answerRows,
        teams: teams,
        teamId: teamId,
        teamName: teamName,
      });
      this.getTeamSnapshot(answerRows, round, teamId, 'componene didmout');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('scoreTable update this', this.props);
    // console.log('scoreTable update prev', prevProps);
    // console.log('scoreTable update this state', this.state);
    // console.log('scoreTable update prev state', prevState);
    if (this.state === this.prevState) return;
    if (this.props !== prevProps) {
      const title = this.props.title;
      const round = this.props.round;
      const answerRows = this.props.answerRows;
      const teams = this.props.teams;
      const teamId = this.props.teamId;
      const teamName = teams.get(teamId);
      this.setState({
        title: title,
        round: round,
        answerRows: answerRows,
        teams: teams,
        teamId: teamId,
        teamName: teamName,
      });
      this.getTeamSnapshot(answerRows, round, teamId, 'componentDidUpdate');
    }
  }

  async getTeamSnapshot(answerRows, round, teamId, calledFrom) {
    // console.log('getTeamSnapshot', teamId, calledFrom);
    const refPath = `/teams/${teamId}/rounds/${round}`;
    const teamData = await firebase.database().ref(refPath);
    // console.log(teamId, refPath, teamData)
    teamData.on('value', (snapshot) => {
      const teamDataVal = snapshot.val();
      // if (teamDataVal !== null) {
      const locked = teamDataVal?.roundLocked ? teamDataVal.roundLocked : false;
      // console.log(teamDataVal, teamId, locked);
      // const points = teamDataVal.totalPoints;
      const teamAnswersNotes = teamDataVal?.teamAnswersNotes;
      const rows = this.makeRows(answerRows, teamAnswersNotes, teamId);
      this.setState({rows, locked});
      // }
    });
  }

  makeRows(answerRows, answersNotes, teamId) {
    // console.log('makeRows', 'answerRows, answersNotes', teamId)
    let newRows = [];
    let totalPoints = 0;
    answerRows.forEach((row) => {
      const qNum = row.number;
      const answerNote = answersNotes && answersNotes[qNum];
      // console.log(answerNote)
      let mach = this.checkAnswer(answerNote?.teamAnswer, row.answer)
      newRows.push({
        key: row.key,
        qNumber: qNum,
        answer: row.answer,
        teamAnswer: answerNote?.teamAnswer,
        teamNote: answerNote?.teamNote,
        match: mach,
        points: answerNote?.points ? answerNote.points : 0,
      });
      totalPoints += 1;
    });

    return newRows;
  }

  checkAnswer(teamAnswer="", answer=""){
    // console.log(teamAnswer, 'answer', answer)
    let answerArr = [];
    let teamAnswerArr = [];
    let teamAnswerArrLowerCase = [];
    
    let match = false;
    if(answer.includes(',')){
      answerArr = answer.split(',')
    } else {
      answerArr.push(answer)
    }
    if(teamAnswer.includes(',')){
      teamAnswerArr = teamAnswer.split(',')
    } else {
      teamAnswerArr.push(teamAnswer)
    }
    teamAnswerArr.forEach(teamAnswer=>{
      teamAnswerArrLowerCase.push(teamAnswer.toLowerCase());
    })
  
    // console.log(teamAnswerArrLowerCase)
    answerArr.forEach(answer => {
      // console.log(answer)
      let re = new RegExp(answer)
      let foo = answer.toLowerCase().trim();
      // console.log(match, teamAnswerArrLowerCase.includes(foo))
      if(match === false && teamAnswerArrLowerCase.includes(foo)){
        match = true;
      }
      // console.log(match)
    });
    return match;
  }
  columns = [
    {
      field: 'qNumber',
      title: 'Q #',
      type: 'string',
      width: '5%',
      cellStyle: {textAlign: 'left'},
      sorting: false,
      headerStyle: {textAlign: 'left'},
      editable: 'never',
      align: 'right',
    },
    {
      field: 'answer',
      title: 'Correct A',
      sorting: false,
      editable: 'never',
    },
    {
      field: 'teamAnswer',
      title: 'Team Answer',
      sorting: false,
      editable: 'never',
    },
    {
      field: 'teamNote',
      title: 'Team Note',
      sorting: false,
      editable: 'never',
    },
    {
      field: 'match',
      title: 'M',
      type: 'boolean',
      width: '5%',
      headerStyle: {textAlign: 'right'},
      editable: 'never',
      align: 'left',
    },
    {
      field: 'points',
      title: 'Points',
      type: 'numeric',
      width: '20%',
      editable: 'always',
      align: 'left',
    },
  ];

  pointsOnChange(value, rowData) {
    const qNum = rowData.qNumber;
    //     answer: "deer"
    // key: 2
    // match: false
    // points: 0
    // qNumber: "Q2"
    // tableData: {id: 1, editCellList: Array(0)}
    // teamAnswer: undefined
    // teamNote: undefined
    const teamId = this.state.teamId;
    const round = this.state.round;
    const refPath = `/teams/${teamId}/rounds/${round}/teamAnswersNotes/${qNum}`;
    const updates = {points: value};
    firebase.database().ref(refPath).update(updates);
  }
  render() {
    // console.log('render');
    const rows = this.state.rows || [];
    const locked = this.state.locked;
    // console.log(locked)
    let lockedText = locked ? 'Yes' : 'Not yet';
    return (
      <MaterialTable
        title={
          <>
            <h2>{this.state.teamName}</h2>
            <p style={{textAlign: 'right'}}>Locked: {lockedText}</p>
          </>
        }
        columns={this.columns}
        data={rows}
        icons={tableIcons}
        options={{
          search: false,
          pageSize: 10,
        }}
        cellEditable={{
          cellStyle: {},
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              resolve();
              console.log('newValue: ' + newValue, rowData);
              this.pointsOnChange(newValue, rowData);
            });
          },
        }}
      />
    );
  }
}
