import React, { Component } from 'react';
import playersData from './data/players.json';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import AddNewRow from "./AddNewRow.js"; 
import DeleteExistingRow from "./DeleteExistingRow.js";
import EditExistingRow from "./EditExistingRow.js";
 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      update:false,
      data: playersData,
      index: -1
    };
  }

  rowClickHandler = (row, columnIndex, rowIndex, e) => {
    this.state.index = rowIndex
  }

  updateParent = (childData) => {
    this.setState({
      update:true,
      data: childData,
      index: -1
    });
  }

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
        text: 'All', value: this.state.data.length
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
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      onRowClick: this.rowClickHandler
    };

    return (
      <div >
        <BootstrapTable data={this.state.data } striped={true} pagination={ true } options={ options } >
        <TableHeaderColumn dataField='id' width="17%" isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width="40%" filter={ { type: 'TextFilter', delay: 0 } }>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='regions' width="43%" filter={ { type: 'TextFilter', delay: 0 } }>Regions</TableHeaderColumn>
    </BootstrapTable>

    <Router>
          <div>
            <ul className="links">
          <li className="links"><Link to="/add">Add</Link></li>
          <li className="links"><Link to="/edit" >Edit</Link></li>
          <li className="links"><Link to="/delete">Delete</Link></li>
          </ul>
          <Route path="/add" component={(props) => <AddNewRow {...props} parentData={this.state.data} rowIndex = {this.state.index} updateParent={this.updateParent.bind(this)}/>} />
          <Route path="/edit" component={(props) => <EditExistingRow {...props} parentData={this.state.data} rowIndex = {this.state.index} updateParent={this.updateParent.bind(this)}/>} />
          <Route path="/delete" component={(props) => <DeleteExistingRow {...props} parentData={this.state.data} rowIndex = {this.state.index} updateParent={this.updateParent.bind(this)}/>} />
         </div>
         </Router>

      </div>
    );
  }
}

export default App;
