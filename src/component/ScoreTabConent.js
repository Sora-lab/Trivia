import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import ScoreTable from './ScoreTable';
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

export default class ScoreTabConent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      round: null,
      answerRows: null,
      teams: null,
    };
  }

  componentDidMount() {
    // console.log(this.props);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.answerRows);
    if (prevProps === this.props) return;
    this.setState({
      title: this.props.title,
      round: this.props.round,
      answerRows: this.props.answerRows,
      teams: this.props.teams,
    });
  }
  //
  columns = [
    {
      field: 'number',
      title: 'Q #',
      type: 'numeric',
      width: '15%',
      cellStyle: {textAlign: 'left'},
      sorting: false,
      headerStyle: {textAlign: 'left'},
      editable: 'never',
    },
    {
      field: 'answer',
      title: 'Correct Answer',
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
    },
    {
      field: 'point',
      title: 'Points',
      type: 'numeric',
      width: '5%',
      editable: 'always',
    },
  ];

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={1}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={2}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={3}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={4}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={5}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={6}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={7}
            teams={this.props.teams}
          />
        </Grid>
        <Grid item xs={6}>
          <ScoreTable
            title={this.props.title}
            round={this.props.round}
            answerRows={this.props.answerRows}
            teamId={8}
            teams={this.props.teams}
          />
        </Grid>
      </Grid>
    );
  }
}
