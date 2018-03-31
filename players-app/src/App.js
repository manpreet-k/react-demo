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
  constructor(props){
    super(props);
    this.setState({
      update:false
    });
  }

  rowClickHandler = (row, columnIndex, rowIndex, e) => {
    myData.index = rowIndex
  }

  updateParent = () => {
    this.setState({
      update:true
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
        <TableHeaderColumn dataField='id' width="33%" isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width="33%" filter={ { type: 'TextFilter', delay: 10 } }>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='regions' width="33%" filter={ { type: 'TextFilter', delay: 10 } }>Regions</TableHeaderColumn>
    </BootstrapTable>

    <Router>
          <div>
            <ul class="links">
          <li class="links"><Link to="/add">Add</Link></li>
          <li class="links"><Link to="/edit" >Edit</Link></li>
          <li class="links"><Link to="/delete">Delete</Link></li>
          </ul>
          <Route path="/add" component={(props) => <AddNewRow {...props} updateParent={this.updateParent.bind(this)}/>} />
          <Route path="/edit" component={(props) => <EditExistingRow {...props} updateParent={this.updateParent.bind(this)}/>} />
          <Route path="/delete" component={(props) => <DeleteExistingRow {...props} updateParent={this.updateParent.bind(this)}/>} />
         </div>
         </Router>

      </div>
    );
  }
}

// More components
class AddNewRow extends Component {
  
    constructor(props) {
      super(props);
      this.goBack = this.goBack.bind(this);
      this.state = {
        name: '',
        id: '',
        regions: ''
      };
    }

    goBack = (e) => {
      e.preventDefault();
      this.props.updateParent();
      this.props.history.goBack();
    }
  
    onChange = (e) => {
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  
    handleOnClick = (e) => {
      e.preventDefault();
      var newJson = {"name" : this.state.name,
                      "id" : this.state.id,
                      "regions" : this.state.regions}
      myData.data.push(newJson);
      this.goBack(e);
    }
  
    render(){        
        return (
          <div padding = "35px">
          <h3>Add record</h3>
            <form>
            &nbsp; Name:<br/>
              <input type="text" name="name" onChange={this.onChange}/><br/>
              &nbsp;Id: <br/>
              <input type="text" name="id" onChange={this.onChange}/><br/>
              &nbsp;Regions: <br/>
              <input type="text" name="regions" onChange={this.onChange}/><br/><br/>
              <input type="submit" value="Submit" onClick={this.handleOnClick.bind(this)}/>
              &nbsp;&nbsp;<input type="submit" value = "Back" onClick={this.goBack}/>
          </form> 
        </div>)
    }
  }

// More components
class DeleteExistingRow extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this); 
  }

  goBack = (e) => {
      e.preventDefault();
      this.props.updateParent();
      this.props.history.goBack();
  }

  render(){
    if( myData.index !== -1){
      var row = myData.data[myData.index];
      var jsonData = myData.data;
      jsonData.splice(myData.index,1);
      myData.data = jsonData;
      myData.index = -1;
      
      return (
         <div>
        <h3>Deleted record</h3>
            <form>
            &nbsp;Name:<br/>
              <input readonly type="text" name="name" value = {row.name}/><br/>
              &nbsp;Id: <br/>
              <input readonly type="text" name="id" value = {row.id}/><br/>
              &nbsp;Regions: <br/>
              <input readonly type="text" name="regions" value = {row.regions}/><br/><br/>
              <input type="submit" value = "Back" onClick={this.goBack}/>
          </form> 
      </div>);
    }
    else{
      return (
      <div>
        <h3>Select a record to delete!</h3>
        <input type="submit" value = "Back" onClick={this.goBack}/>
        </div>);
    }
  }
}

// More components
class EditExistingRow extends Component {

  constructor(props){
    super(props);
    var index = myData.index;
    this.goBack = this.goBack.bind(this); 
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

  handleOnClick = (e) => {
    e.preventDefault();
    var newJson = {"name" : this.state.name,
                    "id" : this.state.id,
                    "regions" : this.state.regions}
    myData.data.push(newJson);
    this.goBack(e);
  }

  goBack = (e) => {
    e.preventDefault();
    this.props.updateParent();
    this.props.history.goBack();
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
        &nbsp;Name:<br/>
              <input type="text" name="name" value={this.state.name} onChange={this.onChange}/><br/>
              &nbsp; Id: <br/>
              <input type="text" name="id" value={this.state.id} onChange={this.onChange}/><br/>
              &nbsp; Regions: <br/>
              <input type="text" name="regions" value={this.state.regions} onChange={this.onChange}/><br/><br/>
              <input type="submit" value="Submit" onClick={this.handleOnClick.bind(this)}/>
              &nbsp;&nbsp;<input type="submit" value = "Back" onClick={this.goBack}/>
          </form> 
      </div>)
    }
    else {
      return (<div><h3>Select a record to edit!</h3><input type="submit" value = "Back" onClick={this.goBack}/></div>);
    }
  }
}

export default App;
