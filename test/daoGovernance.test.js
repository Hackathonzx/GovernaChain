const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAOGovernance", function () {
    let daoGovernance, votingMechanism, stakingAndIncentive, conflictResolution, proposalManagement, crossChainGovernance, reputationSystem;
    let deployer, addr1;

    beforeEach(async () => {
        [deployer, addr1] = await ethers.getSigners();

        // Deploy contracts
        const VotingMechanism = await ethers.getContractFactory("VotingMechanism");
        votingMechanism = await VotingMechanism.deploy();
        await votingMechanism.waitForDeployment();

        const StakingAndIncentive = await ethers.getContractFactory("StakingAndIncentive");
        stakingAndIncentive = await StakingAndIncentive.deploy();
        await stakingAndIncentive.waitForDeployment();

        const ConflictResolution = await ethers.getContractFactory("ConflictResolution");
        conflictResolution = await ConflictResolution.deploy();
        await conflictResolution.waitForDeployment();

        const ProposalManagement = await ethers.getContractFactory("ProposalManagement");
        proposalManagement = await ProposalManagement.deploy();
        await proposalManagement.waitForDeployment();

        const CrossChainGovernance = await ethers.getContractFactory("CrossChainGovernance");
        crossChainGovernance = await CrossChainGovernance.deploy(
            deployer.address, 
            deployer.address, 
            3, 
            ethers.parseEther("0.1")
        );
        await crossChainGovernance.waitForDeployment();

        const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
        reputationSystem = await ReputationSystem.deploy();
        await reputationSystem.waitForDeployment();

        const DAOGovernance = await ethers.getContractFactory("DAOGovernance");
        daoGovernance = await DAOGovernance.deploy(
            votingMechanism.address,
            stakingAndIncentive.address,
            conflictResolution.address,
            proposalManagement.address,
            crossChainGovernance.address,
            reputationSystem.address
        );
        await daoGovernance.waitForDeployment();
    });

    describe("Proposal Management", function () {
        it("Should create a proposal", async function () {
            await daoGovernance.createProposal("Proposal Title", owner.address); // Use valid address
            const proposal = await daoGovernance.proposals(0);
            expect(proposal.title).to.equal("Proposal Title");
        });

        it("Should allow voting on a proposal", async function () {
            await daoGovernance.createProposal("Vote Proposal");
            await daoGovernance.castVote(0, true, 10);
            const proposalVotes = await votingMechanism.proposalVotes(0, deployer.address);
            expect(proposalVotes.votesCast).to.equal(3); // Quadratic vote
        });
    });

    describe("Cross-Chain Governance", function () {
        it("Should send a proposal to another chain", async function () {
            await daoGovernance.createProposal("Cross-Chain Proposal");
            await daoGovernance.submitCrossChainProposal(0, addr1.address);
            const proposal = await crossChainGovernance.proposals(0);
            expect(proposal.isCrossChain).to.be.true;
            expect(proposal.targetChain).to.equal(addr1.address);
        });
    });
});