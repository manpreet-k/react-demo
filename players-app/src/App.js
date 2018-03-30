import React, { Component } from 'react';
import playersData from './data/players.json';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';

const myData = {
  data: playersData,
  index: -1
}

class App extends Component {

  rowClickHandler = (row, columnIndex, rowIndex, e) => {
    myData.index = rowIndex
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
        text: 'All', value: myData.data.length
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
      <div padding= "35px">
        <BootstrapTable data={myData.data } striped={true} pagination={ true } options={ options } >
        <TableHeaderColumn dataField='id' width="34%" isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width="33%" filter={ { type: 'TextFilter', delay: 10 } }>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='regions' width="33%" filter={ { type: 'TextFilter', delay: 10 } }>Regions</TableHeaderColumn>
    </BootstrapTable>

    <Router>
          <div>
            <ul>
          <li><Link to="/add">Add</Link></li>
          <li><Link to="/edit" >Edit</Link></li>
          <li><Link to="/delete">Delete</Link></li>
          </ul>
          <Route path="/add" component={AddNewRow}/>
          <Route path="/edit" component={EditExistingRow}/>
          <Route path="/delete" component={DeleteExistingRow}/>
        {/* </Route> */}
         {/* <Route path="/add" component={AddNewRow}/>
         <Route path="/edit" component={EditExistingRow}/>
         <Route path="/delete" component={DeleteExistingRow}/> */}
         </div>
         </Router>

      </div>
    );
  }
}

// More components
class AddNewRow extends Component {
  
    constructor() {
      super();
      this.state = {
        name: '',
        id: '',
        regions: ''
      };
    }
  
    onChange = (e) => {
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  
    handleOnClick = () => {
      var newJson = {"name" : this.state.name,
                      "id" : this.state.id,
                      "regions" : this.state.regions}
      myData.data.push(newJson);
    }
  
    render(){        
        return (
          <div>
          <h3>Add record</h3>
          <form>
          <input type="text" name="name" onChange={this.onChange} />
          <input type="text" name="id" onChange={this.onChange} />
          <input type="text" name="regions" onChange={this.onChange} />
          <button type = "submit" name="submit" onClick={this.handleOnClick.bind(this)}> Submit </button>
        </form>
        </div>)
    }
  }

// More components
class DeleteExistingRow extends Component {
  render(){
    if( myData.index !== -1){
      var row = myData.data[index];
      var jsonData = myData.data;
      jsonData.splice(index,1);
      myData.data = jsonData;
      myData.index = -1;
      
      return (
        <div>
        <h3>Delete record</h3>
        <h4> Name: {row.name} </h4>
        <h4> Regions: {row.regions} </h4>
        <h4> ID: {row.id} </h4>
      </div>)
    }
    else{
      return (<h1>Select a record to delete!</h1>);
    }
  }
}

// More components
class EditExistingRow extends Component {

  constructor(props){
    super(props);
    var index = myData.index;
    this.state = {
      name: '',
      id: '',
      regions: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleOnClick = () => {
    var newJson = {"name" : this.state.name,
                    "id" : this.state.id,
                    "regions" : this.state.regions}
    myData.data.push(newJson);
  }

  render(){
   
    var myIndex = myData.index;
   
    if(myIndex !== -1){
      var row = myData.data[myIndex];
      var jsonData = myData.data;
      jsonData.splice(myIndex,1);
      myData.data = jsonData;
      myData.index = -1;
      this.state.regions = row.regions;
      this.state.name = row.name;
      this.state.id = row.id;
    }
    if(this.state.id !== ""){
      return (
        <div>
        <h3>Edit record</h3>
        <form>
        <input type="text" name="name" value={this.state.name} onChange={this.onChange.bind(this)} />
        <input type="text" name="id" value={this.state.id} onChange={this.onChange.bind(this)} />
        <input type="text" name="regions" value={this.state.regions} onChange={this.onChange.bind(this)} />
        <button type = "submit" name="submit" onClick={this.handleOnClick.bind(this)}> Submit </button>
      </form>
      </div>)
    }
    else {
      return (<h3>Select a record to edit!</h3>);
    }
  }
}

export default App;
