import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import firebase from 'firebase';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: new Map(),
    };
  }

  componentDidMount() {
    //
  }
  teamNameOnChange(teamId, e){
    const teamName = e.target.value
    const refPath = `/teams/${teamId}`;
    firebase.database().ref(refPath).update({
      teamName: teamName,
    });
  }
  render() {
    return (
      <div
        className="home-main"
        style={{background: '#c2d1e8', padding: '2em'}}
      >
        <header style={{padding: '2em', fontFamily: "'Rock Salt', cursive"}}>
          <h2>Welcome to Ringermaster of Shit Show</h2>
        </header>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={1}
                label="Team 1"
                defaultValue="The Rural Jurors"
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(1, e)}}
              />
              <p>
                {' '}
                <a href="/team/1">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={2}
                label="Team 2"
                defaultValue="Two Jims, Elisa, and a Pizza Place"
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(2, e)}}
              />
              <p>
                {' '}
                <a href="/team/2">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={3}
                label="Team 3"
                defaultValue="Team Austin"
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(3, e)}}
              />
              <p>
                {' '}
                <a href="/team/3">Enter here</a>
              </p>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={4}
                label="Team 4"
                defaultValue="Greg Abbott's Petri Dish"
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(4, e)}}
              />
              <p>
                {' '}
                <a href="/team/4">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={5}
                label="Team 5"
                defaultValue=""
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(5, e)}}
              />
              <p>
                {' '}
                <a href="/team/5">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={6}
                label="Team 6"
                defaultValue=""
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(6, e)}}
              />
              <p>
                {' '}
                <a href="/team/6">Enter here</a>
              </p>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={7}
                label="Team 7"
                defaultValue=""
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(7, e)}}
              />
              <p>
                {' '}
                <a href="/team/7">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={8}
                label="Team 8"
                defaultValue=""
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(8, e)}}
              />
              <p>
                {' '}
                <a href="/team/8">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <TextField
                id={9}
                label="Team 9"
                defaultValue=""
                variant="outlined"
                style={{width: '100%'}}
                onChange={(e)=>{this.teamNameOnChange(9, e)}}
              />
              <p>
                {' '}
                <a href="/team/9">Enter here</a>
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
