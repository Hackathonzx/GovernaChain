// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingMechanism.sol";
import "./StakingAndIncentive.sol";
import "./ConflictResolution.sol";
import "./ProposalManagement.sol";
import "./CrossChainGovernance.sol";
import "./ReputationSystem.sol";

contract DAOGovernance {
    VotingMechanism public votingMechanism;
    StakingAndIncentive public stakingAndIncentive;
    ConflictResolution public conflictResolution;
    ProposalManagement public proposalManagement;
    CrossChainGovernance public crossChainGovernance;
    ReputationSystem public reputationSystem;

    constructor(
        address _votingMechanism,
        address _stakingAndIncentive,
        address _conflictResolution,
        address _proposalManagement,
        address _crossChainGovernance,
        address _reputationSystem
    ) {
        votingMechanism = VotingMechanism(_votingMechanism);
        stakingAndIncentive = StakingAndIncentive(_stakingAndIncentive);
        conflictResolution = ConflictResolution(_conflictResolution);
        proposalManagement = ProposalManagement(_proposalManagement);
        crossChainGovernance = CrossChainGovernance(_crossChainGovernance);
        reputationSystem = ReputationSystem(_reputationSystem);
    }

    // Function to create a new proposal
    function createProposal(string memory description) external {
        proposalManagement.createProposal(description, msg.sender);
    }

    // Function to cast a vote
    function castVote(uint256 proposalId, bool inFavor, uint256 votes) external {
        uint256 votingPower = stakingAndIncentive.calculateVotingPower(msg.sender);
        require(votingPower >= votes, "Insufficient voting power");
        
        votingMechanism.castQuadraticVote(proposalId, inFavor, votes);
        reputationSystem.reward(msg.sender, 1);  // Reward for participation
    }

    // Example function to submit cross-chain proposals
    function submitCrossChainProposal(uint256 proposalId, address targetChain) external {
        crossChainGovernance.sendProposalToChain(proposalId, targetChain);
    }
}
