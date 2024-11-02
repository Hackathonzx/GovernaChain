const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy VotingMechanism contracts
    const VotingMechanism = await ethers.getContractFactory("VotingMechanism");
    const votingMechanism = await VotingMechanism.deploy();
    await votingMechanism.waitForDeployment();
    console.log("VotingMechanism deployed to:", await votingMechanism.getAddress());

    // Deploy StakingAndIncentive contracts
    const StakingAndIncentive = await ethers.getContractFactory("StakingAndIncentive");
    const stakingAndIncentive = await StakingAndIncentive.deploy();
    await stakingAndIncentive.waitForDeployment();
    console.log("StakingAndIncentive deployed to:", await stakingAndIncentive.getAddress());

    // Deploy ConflictResolution contracts
    const ConflictResolution = await ethers.getContractFactory("ConflictResolution");
    const conflictResolution = await ConflictResolution.deploy();
    await conflictResolution.waitForDeployment();
    console.log("ConflictResolution deployed to:", await conflictResolution.getAddress());

    // Deploy ProposalManagement contracts
    const ProposalManagement = await ethers.getContractFactory("ProposalManagement");
    const proposalManagement = await ProposalManagement.deploy();
    await proposalManagement.waitForDeployment();
    console.log("ProposalManagement deployed to:", await proposalManagement.getAddress());

    // Deploy crossChainGovernancecontracts
    const CrossChainGovernance = await ethers.getContractFactory("CrossChainGovernance");
    const crossChainGovernance = await CrossChainGovernance.deploy(
        deployer.address, // treasury
        deployer.address, // governanceToken
        3,                // quorum
        ethers.parseEther("0.1") // proposalReward
    );
    await crossChainGovernance.waitForDeployment();
    console.log("CrossChainGovernance deployed to:", await crossChainGovernance.getAddress());

    // Deploy ReputationSystem contracts
    const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
    const reputationSystem = await ReputationSystem.deploy();
    await reputationSystem.waitForDeployment();
    console.log("ReputationSystem deployed to:", await reputationSystem.getAddress());

    // Deploy DAOGovernance contracts
    const DAOGovernance = await ethers.getContractFactory("DAOGovernance");
    const daoGovernance = await DAOGovernance.deploy(
        votingMechanism.address,
        stakingAndIncentive.address,
        conflictResolution.address,
        proposalManagement.address,
        crossChainGovernance.address,
        reputationSystem.address
    );
    await daoGovernance.waitForDeployment();
    console.log("DAOGovernance deployed to:", await daoGovernance.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
