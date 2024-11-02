// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProposalManagement {
    enum ProposalCategory { General, Financial, Regulatory, ConflictResolution }

    struct Proposal {
        ProposalCategory category;
        string description;
        address proposer;
        bool executed;
    }

    Proposal[] public proposals;

    function createProposal(string memory description, address proposer) external {
        proposals.push(Proposal(ProposalCategory.General, description, proposer, false));
    }
}
