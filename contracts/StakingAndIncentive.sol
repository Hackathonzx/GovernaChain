// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingAndIncentive {
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public reputation;

    function stake(uint256 amount) external {
        // Logic for staking tokens
        stakes[msg.sender] += amount;
    }

    function reward(address _member, uint256 points) external {
        reputation[_member] += points;
    }

    function calculateVotingPower(address member) external view returns (uint256) {
        // Logic to calculate voting power based on staking and reputation
        return stakes[member] + reputation[member];
    }
}
