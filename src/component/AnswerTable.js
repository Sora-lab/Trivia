import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {forwardRef} from 'react';

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

import firebase from 'firebase';

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

export default class AnswerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: parseInt(this.props.round) + 1,
      rows: [],
      answers: null,
      title: '',
    };
  }
  componentDidMount() {
    // console.log('answerTable componentDidMount', this.props);
    this.getSnapshot();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   'answerTable componentDidUpdate',
    //   this.props.round,
    //   prevProps.round,

    // );
    if (this.props === prevProps) return;
    this.getSnapshot();
  }

  columnsHost = [
    {field: 'key', type: 'numeric', title: 'Sort order', width: '90px'},
    {field: 'number', title: 'Q #', width: '90px'},
    {field: 'answer', title: 'Correct answer'},
  ];

  async getSnapshot() {
    // console.log('answerTable getSnapshot', this.props.round);
    const round = parseInt(this.props.round) + 1;
    // console.log(round)
    const roundData = firebase.database().ref(`/answers/${round}`);
    roundData.on('value', (snapshot) => {
      this.makeRowsSetTitle(snapshot.val(), round);
    });
  }

  async makeRowsSetTitle(roundData, round) {
    // console.log('answerTable makeRowsSetTitle', this.props, roundData);
    if (roundData === null || roundData === undefined) {
      this.setState({title: '', rows: [], round: round});
    } else {
      const roundAnswers = roundData['roundAnswers'];
      let rows = [];
      for (const key in roundAnswers) {
        if (roundAnswers.hasOwnProperty(key)) {
          const element = roundAnswers[key];
          rows.push({
            number: key,
            key: parseInt(element['sortOrder']),
            answer: element['answer'],
          });
        }
      }
      rows.sort((a, b)=>a.key -b.key)
      this.setState({title: roundData['roundTitle'], rows, round});
    }
  }

  titleOnChange(e) {
    const round = this.state.round;
    // console.log(round)
    const refPath = `/answers/${round}`;
    this.setState({title: e.target.value});
    firebase.database().ref(refPath).update({
      roundTitle: e.target.value,
    });
  }

  // handleOnRowAdd(newData) {
  //   console.log('handleonRowAdd', newData, typeof newData.number);
  //   const round = this.state.round;
  //   const QNumber = `${newData.number.trim()}`; // realtime database doesn't take decimal
  //   // console.log(round, QNumber)
  //   const QAnswer = newData.answer;
  //   const refPath = `/answers/${round}/roundAnswers/${QNumber}`;
  //   firebase.database().ref(refPath).update({
  //     answer: QAnswer,
  //   });
  // }

  handleOnRowUpdate(newData) {
    // console.log('handleOnRowUpdate', newData);
    const round = this.state.round;
    const QNumber = `${newData.number.trim()}`; // realtime database doesn't take decimal
    const QAnswer = newData.answer;
    const sortOrder = newData.key;
    const refPath = `/answers/${round}/roundAnswers/${QNumber}`;
    firebase.database().ref(refPath).update({
      sortOrder: parseInt(sortOrder),
      answer: QAnswer,
    });
  }

  handleOnRowDelete(newData, oldData) {
    // console.log('handleOnRowDelete', newData);
    const round = this.state.round;
    const QNumber = `${newData.number.trim()}`;
    const refPath = `/answers/${round}/roundAnswers/${QNumber}`;
    firebase.database().ref(refPath).remove();
  }

  render() {
    const rows = this.state.rows;
    const title = this.state.title;
    // console.log('AnswerTable render', title, rows);
    const editable = {
      onRowAdd: (newData, oldData) =>
        new Promise((resolve) => {
          resolve();
          this.handleOnRowUpdate(newData);
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
          resolve();
          this.handleOnRowUpdate(newData);
        }),
      onRowDelete: (newData, oldData) =>
        new Promise((resolve) => {
          resolve();
          this.handleOnRowDelete(newData, oldData);
        }),
    }
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MaterialTable
              title={
                <>
                  <TextField
                    style={{margin: '2em'}}
                    value={title}
                    label="Round Title"
                    variant="outlined"
                    onChange={(e) => this.titleOnChange(e)}
                  />
                  <p>
                    * Q# doesn't take decimal point. <br /> use 1a or 1_1 for
                    bunus questions
                  </p>
                </>
              }
              columns={this.columnsHost}
              data={rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              editable={editable}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
