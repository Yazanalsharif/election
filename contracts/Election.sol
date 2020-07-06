pragma solidity ^0.6.10;

contract Election {
    //the id, name , voters of candidate
    struct Candidate{
        uint id;
        string name;
        uint votersNum;
    }
    //the counter of candidate
    uint  numOfCandidate;
    //mapping the cadidates
    mapping(uint => Candidate) public candidates;
    //the conter of voters
    uint numOfVoters;
    //the voters address and to who vote
    mapping(address => bool) public voters;
    //events voting
    event voting(address  _voter, string  indexed _candidentName, uint indexed _candidentId, uint indexed voting);
    //constructor to create twe candidate here
    constructor () public {
        determineCandidate("yazanalsharif", 0);
        determineCandidate("qusaialsharif", 0);
    }
    function getMsgSender() public view returns(address) {
        return msg.sender;
    }
    //get number of candidate
    function getNumOfCandidate() public view returns(uint) {
        return numOfCandidate;
    }
    //get number of Voter
    function getNumOfVoters() public view returns(uint) {
        return numOfVoters;
    }
    //internal function to create candidate
    function determineCandidate(string memory _name, uint _voting) internal {
        for(uint i = 0; i < numOfCandidate; i++) {
            if(toCompareString(candidates[i].name, _name)){
                revert("the candidate id is already exist");
            }
        }
         Candidate memory candidate = Candidate(numOfCandidate, _name, _voting);
         candidates[numOfCandidate] = candidate;
         numOfCandidate++;
    }
    //to compare  strings
     function toCompareString(string memory first, string memory secound) internal pure returns(bool) {
        return keccak256(bytes(first)) == keccak256(bytes(secound));// explain this statment
    }
    //vote for specific candidate
    function voteToCandidate(uint _id) public {
        require(!voters[msg.sender], "you already vote");
        require(!toCompareString(candidates[_id].name, ""), "the candidate does't found");
        candidates[_id].votersNum++;
        voters[msg.sender] = true;
        numOfVoters++;
        emit voting(msg.sender,candidates[_id].name, _id, candidates[_id].votersNum);
    }
}

