import React, {Component} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

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

import TabConent from '../component/TabContent';

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

export default class HostScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: '',
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
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 0}
          role="tabpanel"
          value={0}
          index={0}
        >
          <TabConent round='Tourist' />
        </div>
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 1}
          role="tabpanel"
          value={1}
          index={1}
        >
          <TabConent round='Picture'/>
        </div>
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 2}
          role="tabpanel"
          value={2}
          index={2}
        >
          <TabConent round='Food' />
        </div>
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 3}
          role="tabpanel"
          value={2}
          index={2}
        >
          <TabConent round='Onomatopoeia'/>
        </div>
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 4}
          role="tabpanel"
          value={2}
          index={2}
        >
          <TabConent title={'Onamonapia'}/>
        </div>
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 5}
          role="tabpanel"
          value={2}
          index={2}
        >
          <TabConent round='Sound'/>
        </div>
        <div
          style={{paddingTop: '16px'}}
          hidden={this.state.selectedTab !== 6}
          role="tabpanel"
          value={2}
          index={2}
        >
          <TabConent round='Why so werid, Japan'/>
        </div>
    </div>
    );
  }
}
