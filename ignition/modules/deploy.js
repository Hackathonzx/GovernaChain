const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy contracts
    const VotingMechanism = await ethers.getContractFactory("VotingMechanism");
    const votingMechanism = await VotingMechanism.deploy();
    await votingMechanism.waitForDeployment();
    console.log("VotingMechanism deployed to:", await votingMechanism.getAddress());

    const StakingAndIncentive = await ethers.getContractFactory("StakingAndIncentive");
    const stakingAndIncentive = await StakingAndIncentive.deploy();
    await stakingAndIncentive.waitForDeployment();
    console.log("StakingAndIncentive deployed to:", await stakingAndIncentive.getAddress());

    const ConflictResolution = await ethers.getContractFactory("ConflictResolution");
    const conflictResolution = await ConflictResolution.deploy();
    await conflictResolution.waitForDeployment();
    console.log("ConflictResolution deployed to:", await conflictResolution.getAddress());

    const ProposalManagement = await ethers.getContractFactory("ProposalManagement");
    const proposalManagement = await ProposalManagement.deploy();
    await proposalManagement.waitForDeployment();
    console.log("ProposalManagement deployed to:", await proposalManagement.getAddress());

    const CrossChainGovernance = await ethers.getContractFactory("CrossChainGovernance");
    const crossChainGovernance = await CrossChainGovernance.deploy(
        deployer.address, // treasury
        deployer.address, // governanceToken
        3,                // quorum
        ethers.utils.parseEther("0.1") // proposalReward
    );
    await crossChainGovernance.waitForDeployment();
    console.log("CrossChainGovernance deployed to:", await crossChainGovernance.getAddress());

    const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
    const reputationSystem = await ReputationSystem.deploy();
    await reputationSystem.waitForDeployment();
    console.log("ReputationSystem deployed to:", await reputationSystem.getAddress());

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
