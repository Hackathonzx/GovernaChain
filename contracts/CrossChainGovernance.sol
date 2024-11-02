// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainGovernance {
    address public treasury;
    address public governanceToken;
    uint256 public quorum;
    uint256 public proposalReward;

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 value; // fund allocation amount if proposal approved
        bool executed;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
        // Add cross-chain related fields
        bool isCrossChain;
        address targetChain;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed proposalId, address proposer, string description, uint256 value);
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalVoted(uint256 indexed proposalId, address voter, bool support);
    event RewardIssued(address recipient, uint256 amount);
    event CrossChainProposalSent(uint256 indexed proposalId, address targetChain);

    modifier onlyTreasury() {
        require(msg.sender == treasury, "Only treasury can call this function.");
        _;
    }

    modifier onlyGovernanceToken() {
        require(msg.sender == governanceToken, "Only governance token contract can call this function.");
        _;
    }

    constructor(address _treasury, address _governanceToken, uint256 _quorum, uint256 _proposalReward) {
        treasury = _treasury;
        governanceToken = _governanceToken;
        quorum = _quorum;
        proposalReward = _proposalReward;
    }

    // Add the missing sendProposalToChain function
    function sendProposalToChain(uint256 proposalId, address targetChain) external {
        require(proposalId <= proposalCount && proposalId > 0, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(targetChain != address(0), "Invalid target chain address");

        // Mark the proposal as cross-chain
        proposal.isCrossChain = true;
        proposal.targetChain = targetChain;

        // Emit event for cross-chain communication
        emit CrossChainProposalSent(proposalId, targetChain);
        
        // Note: In a real implementation, you would need to integrate with a
        // cross-chain messaging protocol (like LayerZero, Chainlink CCIP, etc.)
        // to actually send the proposal data to the target chain
    }

    function createProposal(string calldata description, uint256 value) external returns (uint256) {
        proposalCount++;

        // Create a new Proposal instance in storage
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.value = value;
        newProposal.executed = false;
        newProposal.yesVotes = 0;
        newProposal.noVotes = 0;
        newProposal.isCrossChain = false;

        emit ProposalCreated(proposalCount, msg.sender, description, value);
        return proposalCount;
    }

    function voteOnProposal(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed.");
        require(!proposal.hasVoted[msg.sender], "Already voted.");

        proposal.hasVoted[msg.sender] = true;

        if (support) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        emit ProposalVoted(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) external onlyTreasury {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed.");
        require(proposal.yesVotes >= quorum, "Not enough votes to execute proposal.");

        // Mark proposal as executed
        proposal.executed = true;

        // Fund Allocation Logic: Transfer funds to proposer if specified in the proposal
        if (proposal.value > 0) {
            payable(proposal.proposer).transfer(proposal.value);
        }

        // State Change Logic: For this example, adjusting quorum
        if (proposal.yesVotes > proposal.noVotes && proposal.value == 0) {
            quorum = quorum + 1;
        }

        emit ProposalExecuted(proposalId);

        // Incentive Issuance: Reward proposer upon successful execution
        if (proposalReward > 0) {
            (bool success, ) = governanceToken.call(abi.encodeWithSignature("mint(address,uint256)", proposal.proposer, proposalReward));
            require(success, "Reward issuance failed");
            emit RewardIssued(proposal.proposer, proposalReward);
        }
    }

    receive() external payable {}
}