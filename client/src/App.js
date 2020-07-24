import React, { Component } from "react";
import electionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import Navbar from "./react/Navbar";
import Main from "./react/Main";

class App extends Component {
 
 
 
  constructor(props){
    super(props);
    this.state = {
      loaded:false,
       candidate:null,
       address:null,
       hasVoted:false};
    
  }
  componentDidMount = async () => {
    
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

    
      //const networkId = await web3.eth.net.getId();
      this.networkId = await this.web3.eth.net.getId();
      //const deployedNetwork = SimpleStorageContract.networks[networkId];
      // Get the contract instance.
      this.electionInstance = await new this.web3.eth.Contract(
        electionContract.abi,
        electionContract.networks[this.networkId] && electionContract.networks[this.networkId].address
      );
      this.changeAccountHandle();
      this.ubdateTheMsgSender();
      this.listenToVoters();
      this.getTheCandidateData();
      // when end of loading the page will open 
      //edit the way of address and when change the address change it in the page withd redownload
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  //get the candidate Data to display it for the client
  getTheCandidateData = async () => {
    //get the number of candidate 
    const numberOfCandidate = await this.electionInstance.methods.getNumOfCandidate().call();
    let candid = [];
    for(let i = 0; i < numberOfCandidate; i++){
      candid[i] = await this.electionInstance.methods.candidates(i).call();
    }
    this.setState({candidate:candid});
  }
  voteToYourCandidate = async (votersId) => {
    const voting = await this.electionInstance.methods.voteToCandidate(votersId).send({from:this.accounts[0]}).on("error",(error) => {
     console.log("the error is ");
     console.log(error);
   });
   
   this.setState({hasVoted:true});
  }
  //when change the account will do this function 
  changeAccountHandle = async () => {
      await window.ethereum.on("accountsChanged", async account => {
      this.setState({address:account});
    });
  }
  
  listenToVoters = async () => {
    const voter = await this.electionInstance.methods.voters(this.accounts[0]).call();
    this.setState({hasVoted:voter});
  }
  ubdateTheMsgSender = async () => {
    const callAddress = this.accounts[0];
    this.setState({address:callAddress});
  }
  

  render() {
    if (!this.state.loaded) {
      return <div>
        <Navbar/>
          <p className="errorclass">loading for web3 please Check you meta mask and your network</p>
        </div>;
    }
    return (
      <div className="App">
        <Navbar/>
        <h1 className="header-table">election result</h1>
        <div className="table-css">

        <Main 
        candidate={this.state.candidate} 
        address={this.state.address}
        voting={this.voteToYourCandidate}
        voted={this.state.hasVoted}
        />

        </div>
      </div>
    );
  }
}

export default App;
