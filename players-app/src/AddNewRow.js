import React, { Component } from 'react';
import './index.css';

// More components
class AddNewRow extends Component {
  
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      name: '',
      id: '',
      regions: '',
      childData: ''
    };
  }

  goBack = (e) => {
    e.preventDefault();
    this.props.updateParent(this.state.childData);
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
    this.state.childData = this.props.parentData;
    this.state.childData.push(newJson);
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

export default AddNewRow;
