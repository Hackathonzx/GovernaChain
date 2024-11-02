const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("All Contracts", function () {
    let ConflictResolution, conflictResolution;
    let ProposalManagement, proposalManagement;
    let ReputationSystem, reputationSystem;
    let StakingAndIncentive, stakingAndIncentive;
    let VotingMechanism, votingMechanism;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        ConflictResolution = await ethers.getContractFactory("ConflictResolution");
        conflictResolution = await ConflictResolution.deploy();
        await conflictResolution.waitForDeployment();

        ProposalManagement = await ethers.getContractFactory("ProposalManagement");
        proposalManagement = await ProposalManagement.deploy();
        await proposalManagement.waitForDeployment();

        ReputationSystem = await ethers.getContractFactory("ReputationSystem");
        reputationSystem = await ReputationSystem.deploy();
        await reputationSystem.waitForDeployment();

        StakingAndIncentive = await ethers.getContractFactory("StakingAndIncentive");
        stakingAndIncentive = await StakingAndIncentive.deploy();
        await stakingAndIncentive.waitForDeployment();

        VotingMechanism = await ethers.getContractFactory("VotingMechanism");
        votingMechanism = await VotingMechanism.deploy();
        await votingMechanism.waitForDeployment();
    });

    describe("ConflictResolution", function () {
        it("Should raise a dispute", async function () {
            await conflictResolution.raiseDispute(1);
            const dispute = await conflictResolution.disputes(1);
            expect(dispute.proposalId).to.equal(1);
            expect(dispute.raisedBy).to.equal(owner.address);
            expect(dispute.resolved).to.equal(false);
        });

        it("Should resolve a dispute", async function () {
            await conflictResolution.raiseDispute(1);
            await conflictResolution.resolveDispute(1, true);
            const dispute = await conflictResolution.disputes(1);
            expect(dispute.resolved).to.equal(true);
        });
    });

    describe("ProposalManagement", function () {
        it("Should create a proposal", async function () {
            await proposalManagement.createProposal("Test Proposal", owner.address);
            const proposal = await proposalManagement.proposals(0);
            expect(proposal.description).to.equal("Test Proposal");
            expect(proposal.proposer).to.equal(owner.address);
            expect(proposal.executed).to.equal(false);
        });
    });

    describe("ReputationSystem", function () {
        it("Should reward reputation points", async function () {
            await reputationSystem.reward(addr1.address, 10);
            const rep = await reputationSystem.reputation(addr1.address);
            expect(rep).to.equal(10);
        });

        it("Should penalize reputation points", async function () {
            await reputationSystem.reward(addr1.address, 10);
            await reputationSystem.penalize(addr1.address, 5);
            const rep = await reputationSystem.reputation(addr1.address);
            expect(rep).to.equal(5);
        });
    });

    describe("StakingAndIncentive", function () {
        it("Should allow staking of tokens", async function () {
            await stakingAndIncentive.stake(100);
            const stakeAmount = await stakingAndIncentive.stakes(owner.address);
            expect(stakeAmount).to.equal(100);
        });

        it("Should calculate voting power", async function () {
            await stakingAndIncentive.stake(100);
            await reputationSystem.reward(owner.address, 50);
            const votingPower = await stakingAndIncentive.calculateVotingPower(owner.address);
            expect(votingPower).to.equal(150);
        });
    });

    describe("VotingMechanism", function () {
        it("Should cast a vote", async function () {
            await votingMechanism.castQuadraticVote(1, true, 9); // Assume voting has been set up
            const vote = await votingMechanism.proposalVotes(1, owner.address);
            expect(vote.votesCast).to.equal(3); // sqrt(9) = 3
            expect(vote.inFavor).to.equal(true);
        });

        it("Should delegate vote", async function () {
            await votingMechanism.delegateVote(addr1.address);
            const delegate = await votingMechanism.delegates(owner.address);
            expect(delegate).to.equal(addr1.address);
        });
    });
});
