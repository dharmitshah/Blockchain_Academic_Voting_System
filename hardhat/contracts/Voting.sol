// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Voting {
    //Structure to create election candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 numberOfVotes;

    }

    //store candidates list
    Candidate[] public candidates;

    //Store owner's address
    address public owner;

    //Map all voters' address
    mapping(address=>bool) public voters;

    //Store list of voters
    address[] public listOfVoters;

    //Voting Time creation
    uint256 public votingStart;
    uint256 public votingEnd;

    //Create Election status
    bool public electionStarted;

    // Condition to allow owner only to start election
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not authorised to start an election"
        );
        _;
    }

    //validate if an election is in process
    modifier electionOngoing() {
        require(electionStarted, "No election yet");
        _;
    }

    //constructor to store owner address
    constructor() {
        owner=msg.sender;

    }

    //This function will start election and store candidates data object
    function startElection(string[] memory _candidates, uint256 _votingDuration) public onlyOwner {
        require(electionStarted==false, "ELection is currently ongoing");
        delete candidates;
        resetAllVoterStatus();

        for(uint256 i=0; i<_candidates.length; i++){
            candidates.push(
                Candidate({id: i, name:_candidates[i], numberOfVotes: 0})
            );
        }
        electionStarted=true;
        votingStart=block.timestamp;
        votingEnd=block.timestamp + (_votingDuration*1 minutes);

    }

    //This function will add candidate to the object
    function addCandidate(
        string memory _name
    ) public onlyOwner electionOngoing{
        require(checkElectionPeriod(), "Election period has Ended");
        candidates.push(
            Candidate({id: candidates.length, name: _name, numberOfVotes:0})
        );
    }

    // This function checks voter status
    function voterStatus(
        address _voter
    ) public view electionOngoing returns (bool) {
        if(voters[_voter]==true){
            return true;
        }
        return false;
    }

    //This function is to send vote to the blockchain
    function voteTo(uint256 _id) public electionOngoing {
        require(checkElectionPeriod(), "Election period has Ended");
        require(
            !voterStatus(msg.sender),
            "You already voted. You can only vote once."
        );
        candidates[_id].numberOfVotes++;
        voters[msg.sender]=true;
        listOfVoters.push(msg.sender);

    }

    //This function retrieves candidates information
    function retrieveVotes() public view returns (Candidate[] memory) {
        return candidates;

    }

    //This function tracks the Election Time
    function electionTimer() public view electionOngoing returns (uint256) {
        if(block.timestamp>=votingEnd) {
            return 0;
        }
        return (votingEnd-block.timestamp);

    }

    //This function tracks the Election is ongoing
    function checkElectionPeriod() public returns (bool) {
        if(electionTimer()>0){
            return true;
        }
        electionStarted=false;
        return false;

    }

    //This function reset the status of all voters
    function resetAllVoterStatus() public onlyOwner {
        for (uint256 i=0; i< listOfVoters.length; i++) {
            voters[listOfVoters[i]]=false;
        }
        delete listOfVoters;

    }


}