import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';

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

export default class TabConent extends Component{
  columnsHost = [
    {field: 'round', title: 'Round', width: '5%'},
    {field: 'number', title: 'Q #', width: '90px'},
    {field: 'answer', title: 'Correct A'},
  ];
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
      title: 'Correct A',
      sorting: false,
      editable: 'never',
    },
    {
      field: 'teamInput',
      title: 'Team A',
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
      title: 'Point',
      type: 'boolean',
      width: '5%',
      editable: 'always',
    },
  ];
  rows = [
    {
      round: 'Music',
      number: '1',
      answer: 'Remote Control',
      teamInput: 'remo mom',
      match: 'true',
      point: 'yes',
      key: 1,
    },
    {
      round: 'Music',
      number: '2',
      answer: 'Remote Control',
      teamInput: 'remo mom',
      match: 'true',
      point: 'yes',
      key: 2,
    },
  ];
  render() {
    return (
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <MaterialTable
              title={this.props.round}
              columns={this.columnsHost}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return {...prevState, data};
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return {...prevState, data};
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return {...prevState, data};
                      });
                    }, 600);
                  }),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={1}
              title="Team name something"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    resolve();
                  });
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={2}
              title="Team name"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    setTimeout(resolve, 4000);
                  });
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={3}
              title="Team name"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    setTimeout(resolve, 4000);
                  });
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={4}
              title="Team name"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    setTimeout(resolve, 4000);
                  });
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={5}
              title="Team name"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={5}
              title="Team name"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    setTimeout(resolve, 4000);
                  });
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={6}
              title="Editable Example"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    setTimeout(resolve, 4000);
                  });
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MaterialTable
              key={7}
              title="Editable Example"
              columns={this.columns}
              data={this.rows}
              icons={tableIcons}
              options={{
                search: false,
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  return new Promise((resolve, reject) => {
                    console.log('newValue: ' + newValue);
                    setTimeout(resolve, 4000);
                  });
                },
              }}
            />
          </Grid>
        </Grid>

    )
  }
}