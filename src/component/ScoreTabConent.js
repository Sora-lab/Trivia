import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ScoreTable from './ScoreTable';

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
