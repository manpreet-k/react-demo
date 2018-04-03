import React, { Component } from 'react';
import './index.css';

class EditExistingRow extends Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this); 
    this.state = {
      name: '',
      id: '',
      regions: '',
      childData: '',
      set: false
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleOnClick = (e) => {
    e.preventDefault();

    this.state.childData[this.props.rowIndex].name = this.state.name;
    this.state.childData[this.props.rowIndex].id = this.state.id;
    this.state.childData[this.props.rowIndex].regions = this.state.regions;

    this.goBack(e);
  }

  goBack = (e) => {
    e.preventDefault();
    this.props.updateParent(this.state.childData);
    this.props.history.goBack();
  }

  render(){
    var myIndex = this.props.rowIndex;
   
    if(!this.state.set && myIndex !== -1){
      this.state.childData = this.props.parentData;
      var row = this.state.childData[this.props.rowIndex];
      var jsonData = this.state.childData;
      this.state.childData = jsonData;
      this.state.regions = row.regions;
      this.state.name = row.name;
      this.state.id = row.id;
      if(!this.state.set){
        this.state.set = true;
      }
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

export default EditExistingRow;
