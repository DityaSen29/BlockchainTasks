// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Voter {
        bool isRegistered; 
        bool hasVoted;      
        uint256 votedTo;    
    }

    struct Candidate {
        uint256 id;    
        string name;      
        uint256 voteCount;  
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    address public owner;
    uint256 public votingStartTime;
    uint256 public votingEndTime;

    // Winner tracking variables
    string public winnerName;
    uint256 public winnerVotes;
    bool public isWinnerDeclared;

    event VoterRegistered(address voter);
    event CandidateRegistered(uint256 candidateId, string name);
    event VotingStarted(uint256 startTime, uint256 endTime);
    event VoteCast(address voter, uint256 candidateId);
    event WinnerDeclared(string winnerName, uint256 winnerVotes);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier duringVoting() {
        require(block.timestamp >= votingStartTime && block.timestamp <= votingEndTime, "Voting is not active");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerVoter(address _voter) external onlyOwner {
        require(!voters[_voter].isRegistered, "Voter is already registered");
        voters[_voter] = Voter(true, false, 0);
        emit VoterRegistered(_voter);
    }

    function registerCandidate(string memory _name) external onlyOwner {
        uint256 newCandidateId = candidates.length;
        candidates.push(Candidate(newCandidateId, _name, 0));
        emit CandidateRegistered(newCandidateId, _name);
    }

    function startVoting(uint256 _durationInSeconds) external onlyOwner {
        require(votingEndTime == 0 || block.timestamp > votingEndTime, "Previous voting period still active");
        require(_durationInSeconds > 0, "Duration must be greater than zero");

        votingStartTime = block.timestamp;
        votingEndTime = block.timestamp + _durationInSeconds;
        
        emit VotingStarted(votingStartTime, votingEndTime);
    }

    function vote(uint256 _candidateId) external duringVoting {
        Voter storage voter = voters[msg.sender];

        require(voter.isRegistered, "You are not registered to vote");
        require(!voter.hasVoted, "You have already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        voter.hasVoted = true;
        voter.votedTo = _candidateId;

        candidates[_candidateId].voteCount += 1;
        
        emit VoteCast(msg.sender, _candidateId);
    }

    function declareWinner() external onlyOwner{
        require(block.timestamp >= votingEndTime, "Voting not ended");
        require(!isWinnerDeclared, "Winner already declared");

        uint256 maxVotes = 0;
        uint256 winnerIndex = 0;
        bool isTie = false;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerIndex = i;
                isTie = false;
            } else if (candidates[i].voteCount == maxVotes && maxVotes != 0) {
                isTie = true;
            }
        }

        require(maxVotes > 0, "No votes were cast");
        
        if (isTie) {
            winnerName = "Tie";
        } else {
            winnerName = candidates[winnerIndex].name;
        }
        
        winnerVotes = maxVotes;
        isWinnerDeclared = true;

        emit WinnerDeclared(winnerName, winnerVotes);
    }

    // View functions to get winner and voting details
    function getWinnerDetails() public view returns (string memory, uint256, bool) {
        return (winnerName, winnerVotes, isWinnerDeclared);
    }

    function getCandidateDetails(uint256 _candidateId) public view returns (string memory, uint256) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }

    function getTotalCandidates() external view returns (uint256) {
        return candidates.length;
    }
}
