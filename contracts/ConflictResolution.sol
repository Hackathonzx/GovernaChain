// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConflictResolution {
    struct Dispute {
        uint256 proposalId;
        address raisedBy;
        bool resolved;
    }

    mapping(uint256 => Dispute) public disputes;

    function raiseDispute(uint256 proposalId) external {
        disputes[proposalId] = Dispute(proposalId, msg.sender, false);
    }

    function resolveDispute(uint256 proposalId, bool outcome) external {
        disputes[proposalId].resolved = outcome;
    }
}
