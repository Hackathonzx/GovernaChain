// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    mapping(address => uint256) public reputation;

    function reward(address _member, uint256 points) external {
        reputation[_member] += points;
    }

    function penalize(address _member, uint256 points) external {
        reputation[_member] = reputation[_member] > points ? reputation[_member] - points : 0;
    }
}
