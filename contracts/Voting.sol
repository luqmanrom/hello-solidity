// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    
    address public owner;
    mapping(address => bool) public voters;
    Candidate[] public candidates;
    uint256 public votingStart;
    uint256 public votingEnd;
    bool public electionStarted;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier electionOngoing() {
        require(electionStarted, "No election in progress");
        require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Voting period ended");
        _;
    }
    
    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = votingStart + (_durationInMinutes * 1 minutes);
        electionStarted = true;
        
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                id: i,
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }
    
    function vote(uint256 _candidateId) external electionOngoing {
        require(!voters[msg.sender], "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate");
        
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }
    
    function getAllVotesOfCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }
}
