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
    this.state={
     round: this.props.round + 1,
     rows: null,
     answers: null,
     name: '',
    }
  }
  componentDidMount(){
    console.log(this.props)
    this.getSnapshot()
  }

  async getSnapshot() {
    const snapshot = await firebase
      .database()
      .ref(`/answers/${this.state.round}`)
      // .ref(`/teams/${this.teamId}`)
      .once('value');
    const roundAnswerData = snapshot.val();
    console.log('getSnapshot', roundAnswerData, roundAnswerData['name']);
    this.setState({
      name: roundAnswerData['name'],
      answers: roundAnswerData['answers'],
    });
    this.makeRows(roundAnswerData['answers'])
  }
  columnsHost = [
    {field: 'number', title: 'Q #', width: '90px'},
    {field: 'answer', title: 'Correct A'},
  ];
  makeRows(roundAnswers){
    let rows = [];
    for (const key in roundAnswers) {
      if (roundAnswers.hasOwnProperty(key)) {
        const element = roundAnswers[key];
        rows.push({
          number: key,
          answer: element,
        })
      }
    }
    this.setState({ rows })
  }
  // rows = [
  //   {
  //     number: '1',
  //     answer: 'Remote Control',
  //     key: 1,
  //   },
  //   {
  //     number: '2',
  //     answer: 'Remote Control',
  //     key: 2,
  //   },
  // ];
  render() {
    if(this.state.rows === null ) return null;
    const rows = this.state.rows;
    console.log(rows)
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MaterialTable
              title={
                <>
                  Name: <TextField />
                </>
              }
              columns={this.columnsHost}
              data={rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              editable={{
                onRowAdd: (newData, oldData) =>
                  new Promise((resolve) => {
                    resolve();
                    console.log(newData)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    resolve();
                    console.log(newData)
                  }),
                onRowDelete: (newData, oldData) =>
                  new Promise((resolve) => {
                    resolve();
                    console.log(newData)
                  }),
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
