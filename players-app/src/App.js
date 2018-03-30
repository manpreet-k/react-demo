import React, { Component } from 'react';
import playersData from './data/players.json';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class App extends Component {
  
  render() {

    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '10', value: 10
      }, {
        text: '20', value: 20
      }, {
        text: '30', value: 30
      }, {
        text: '40', value: 40
      }, {
        text: 'All', value: playersData.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 10,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
    };


    return (
      <div padding= "35px">
        <BootstrapTable data={ playersData } striped={true} pagination={ true } options={ options }>
        <TableHeaderColumn dataField='id' width="34%" isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width="33%" filter={ { type: 'TextFilter', delay: 10 } }>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='regions' width="33%" filter={ { type: 'TextFilter', delay: 10 } }>Regions</TableHeaderColumn>
    </BootstrapTable>
      </div>
    );
  }
}

export default App;
