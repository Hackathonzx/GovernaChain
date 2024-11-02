# DAOGovernance System

## Overview

The DAOGovernance system is a decentralized autonomous organization (DAO) governance framework built on Ethereum. It enables community-driven decision-making through proposal management, voting mechanisms, conflict resolution, Cross Chain functionality, staking and reputation systems. This project aims to facilitate effective governance for decentralized applications (dApps) while ensuring transparency and community engagement.

### Features

- **Proposal Creation**: Users can create proposals for governance decisions.
- **Voting Mechanism**: Implements quadratic voting to encourage participation.
- **Conflict Resolution**: Provides a system for resolving disputes over proposals.
- **Staking and Incentives**: Users can stake tokens to gain voting power and receive rewards.
- **Reputation System**: Tracks user reputation to incentivize good participation.
- **Cross-Chain Governance**: Allows proposals to be executed across different blockchains.

## Smart Contracts

### 1. ConflictResolution

This contract manages the dispute resolution process for proposals.

#### Functions:
- `raiseDispute(uint256 proposalId)`: Raises a dispute for a specific proposal.
- `resolveDispute(uint256 proposalId, bool outcome)`: Resolves a dispute for a proposal.

### 2. CrossChainGovernance

Manages proposals that require cross-chain execution and funding allocation.

#### Functions:
- `createProposal(string calldata description, uint256 value)`: Creates a new governance proposal.
- `voteOnProposal(uint256 proposalId, bool support)`: Casts a vote on a proposal.
- `executeProposal(uint256 proposalId)`: Executes a proposal if it has enough support.
- `sendProposalToChain(uint256 proposalId, address targetChain)`: Sends a proposal to a specified target chain.

### 3. DAOGovernance

The main contract that integrates all other contracts for cohesive governance.

#### Functions:
- `createProposal(string memory description)`: Calls `ProposalManagement` to create a proposal.
- `castVote(uint256 proposalId, bool inFavor, uint256 votes)`: Casts a vote and rewards the voter.
- `submitCrossChainProposal(uint256 proposalId, address targetChain)`: Submits a proposal for cross-chain execution.

### 4. ProposalManagement

Handles the creation and management of governance proposals.

#### Functions:
- `createProposal(string memory description, address proposer)`: Creates a new proposal with a description.

### 5. ReputationSystem

Manages the reputation points of participants in the governance process.

#### Functions:
- `reward(address _member, uint256 points)`: Awards reputation points to a member.
- `penalize(address _member, uint256 points)`: Deducts reputation points from a member.

### 6. StakingAndIncentive

Facilitates token staking and calculates voting power based on stakes and reputation.

#### Functions:
- `stake(uint256 amount)`: Allows users to stake tokens.
- `calculateVotingPower(address voter)`: Returns the voting power based on stakes and reputation.

### 7. VotingMechanism

Implements the voting logic, including delegation and quadratic voting.

#### Functions:
- `delegateVote(address _to)`: Allows users to delegate their votes to another address.
- `castQuadraticVote(uint256 proposalId, bool inFavor, uint256 votes)`: Casts a quadratic vote for a proposal.



## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Hardhat](https://hardhat.org/) - Ethereum development environment

### Clone the Repository

git clone https://github.com/Hackathonzx/GovernaChain.git

cd GovernaChain


# Dependencies and Installation
# Dependencies:
- Solidity Version: ^0.8.0
- Hardhat: For local development and testing

npm install --save-dev hardhat
- Chai: Assertion library for testing

npm install chai
- Ethers.js: For interacting with Ethereum

npm install ethers

- Chainlink:

npm install @chainlink/contracts: For utilizing Chainlink CCIP for cross-chain interoperability.

- Chainlink CCIP (Cross-Chain Interoperability Protocol) for cross-chain data transmission.

npm install @chainlink/ccip

# Installation:
- Install the dependencies: npm install
- Compile the smart contracts: npx hardhat compile

# Testing 

Automated tests were written to ensure robust functionality across all contracts in the GovernaChain project. The following areas were covered:

- ConflictResolution: Validates that disputes can be raised and resolved appropriately.
- ProposalManagement: Confirms that proposals are created successfully and stored correctly.
- ReputationSystem: Tests the reward and penalty functions, verifying that reputation points adjust as expected.
- StakingAndIncentive: Ensures tokens can be staked and calculates voting power based on staked tokens and reputation points.
- VotingMechanism: Verifies that votes are cast correctly, including functionality for vote delegation.
- DAOGovernance: Integrates various modules, checking end-to-end proposal creation and cross-chain governance capabilities.

All core functionalities were thoroughly tested, with all of the tests passing successfully, demonstrating the reliability of each contract in the system.

# Deployment

- Deploy the contract: npx hardhat run ignition/modules/deploy.js --network IntersectTestnet

Here are the deplyed script:

- VotingMechanism deployed to: 0xE9B21a68b58584Ee399C2eC95885628D3472B9C1
- StakingAndIncentive deployed to: 0xd3421C39343829ec2CB27e3Ddd834a0714411DFc
- ConflictResolution deployed to: 0x9d0CF830BED49284679F39bD88059D9534B2Fdc7
- ProposalManagement deployed to: 0x79969Ef250514Fa55AbF8589fe8842605f3b231d
- CrossChainGovernance deployed to: 0xa56059F30bacA70C64e186518A990C549C6b03c1
- ReputationSystem deployed to: 0x6AD88342995D8De2B6933cEC1ac6036d2744edc9
- DAOGovernance deployed to: 0x6c8780eAb44017A65Cb5B1649D43aa246aD45c43


# Contributing
- Fork the Repository:
- Create a New Branch:

git checkout -b feature/your-feature

- Make Changes and Commit:

git add .

git commit -m "Add feature"

Push Changes:

git push origin feature/your-feature

# License
[MIT License]

# Acknowledgments
futhmah456@gmail.com

nathfavour02@gmail.com






