import React, { Component } from 'react';
import './index.css';

class DeleteExistingRow extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this); 
    this.state = {
      childData: ''
    };
  }

  goBack = (e) => {
      e.preventDefault();
      this.props.updateParent(this.state.childData);
      this.props.history.goBack();
  }

  render(){
    if( this.props.rowIndex !== -1){
      var row = this.props.parentData[this.props.rowIndex];
      var jsonData = this.props.parentData;
      jsonData.splice(this.props.rowIndex,1);
      this.state.childData = jsonData;
      
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

export default DeleteExistingRow;
