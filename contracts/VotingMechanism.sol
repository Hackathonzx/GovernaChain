// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingMechanism {
    struct Vote {
        uint256 votesCast;
        bool inFavor;
    }

    mapping(address => address) public delegates;
    mapping(uint256 => mapping(address => Vote)) public proposalVotes;

    function delegateVote(address _to) external {
        require(_to != msg.sender, "Cannot delegate to self");
        delegates[msg.sender] = _to;
    }

    function castQuadraticVote(uint256 proposalId, bool inFavor, uint256 votes) external {
        uint256 effectiveVotes = sqrt(votes);  // Quadratic function for vote weight
        proposalVotes[proposalId][msg.sender] = Vote(effectiveVotes, inFavor);
    }

    function sqrt(uint x) internal pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
