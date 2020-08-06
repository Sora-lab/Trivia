import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state={
      teams: new Map(),
    }
  }
  
  componentDidMount(){
    //
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
              The Rural Jurors
              <p>
                {' '}
                <a href="/team/1">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              Two Jims, Elisa, and a Pizza Place
              <p>
                {' '}
                <a href="/team/2">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              Team Austin
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
              Greg Abbott's Petri Dish
              <p>
                {' '}
                <a href="/team/4">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <p>
                {' '}
                <a href="/team/5">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
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
              <p>
                {' '}
                <a href="/team/7">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
              <p>
                {' '}
                <a href="/team/8">Enter here</a>
              </p>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{minHeight: '250px', padding: '2em'}}>
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
