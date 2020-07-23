import React, {Component} from "react";
import "../App.css";



class Main extends Component {
  //this function to got all candidate 
  candidateMember = () => {
    
    if(this.props.candidate){
      let count = 0;
      return this.props.candidate.map((cand, key) => {
        count++;
       return(
         <tr key={key}>
         <th scope="row">{count}</th>
         <td>{cand.id}</td>
         <td>{cand.name}</td>
         <td>{cand.votersNum}</td>
       </tr>
       )
       
        })
    } else {
      return(
        <tr>
         <th scope="row"></th>
         <td></td>
         <td></td>
         <td></td>
       </tr>
      )
    }
  }
  //end of function  candidateMember
  //function to get the select candidate
  gitSelectCandidate = () => {
   
    if(this.props.candidate){
      
      return this.props.candidate.map((cand, key) => {
        
       return(
        <option value={cand.id} key={key}>{cand.name}</option>
       )      
        })
    } else {
      return(
       <option>Non-candidate</option>
      )
    }
  }
  //to handle submit and git data from select
  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.voting(this.candidateId.value);
  
  }

    render(){
        return(
          <div className="MainContent">
          <div className="theTable">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">ID</th>
      <th scope="col">candidate</th>
      <th scope="col">Voters</th>
    </tr>
  </thead>
  <tbody>
  {this.candidateMember()}
  </tbody>    
</table>
</div>
<div className="choose-candidate">
  {!this.props.voted? 
    <form onSubmit={this.handleSubmit}>
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">Example select</label>
      <select className="form-control width" ref={(input) => this.candidateId = input} id="exampleFormControlSelect1">
       {this.gitSelectCandidate()}
      </select>
    </div>
    <div className="btn-group" role="group" aria-label="Basic example">
    <button type="submit" className="btn btn-secondary btn-back">Vote</button>
  </div>
  </form>
  : <p></p>}

 
  
  

</div>
{ this.props.address ?
        <p className="Address"><span className="span-address">your Address:</span> {this.props.address}</p> 
        : <p>undifined</p>
      }
</div>
        )
    }
}
export default Main;