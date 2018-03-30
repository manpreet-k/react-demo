import React, { Component } from 'react';
import playersData from './data/players.json';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class App extends Component {
  
  render() {
    return (
      <div>
        <BootstrapTable data={ playersData } pagination={ true }
        >
        <TableHeaderColumn dataField='id' isKey={ true }> ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'> Name</TableHeaderColumn>
        <TableHeaderColumn dataField='regions'>Regions</TableHeaderColumn>
    </BootstrapTable>
      </div>
    );
  }
}

export default App;
