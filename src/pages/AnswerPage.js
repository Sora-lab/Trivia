import React, {Component} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import AnswerTable from '../component/AnswerTable';

export default class AnswerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  handleTabChange(event, newValue) {
    // console.log(event, newValue);
    this.setState({selectedTab: newValue});
  }

  render() {
    // console.log('answer page render');
    return (
      <div style={{margin: '32px', padding: '32px'}}>
        <Tabs
          value={this.state.selectedTab}
          onChange={(event, newValue) => this.handleTabChange(event, newValue)}
          aria-label="trivia rounds"
        >
          <Tab label="Round 1" value={0} />
          <Tab label="Round 2" value={1} />
          <Tab label="Round 3" value={2} />
          <Tab label="Round 4" value={3} />
          <Tab label="Round 5" value={4} />
          <Tab label="Round 6" value={5} />
          <Tab label="Round 7" value={6} />
          <Tab label="Round 8" value={7} />
        </Tabs>
        <div style={{paddingTop: '16px'}} role="tabpanel">
          <AnswerTable round={this.state.selectedTab} />
        </div>
      </div>
    );
  }
}
