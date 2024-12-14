const { expect } = require("chai");

describe("Voting Contract", function () {
  let Voting;
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["Alice", "Bob", "Charlie"], 60);
    await voting.waitForDeployment();
  });

  it("Should initialize candidates correctly", async function () {
    const candidates = await voting.getAllVotesOfCandidates();
    expect(candidates.length).to.equal(3);
    expect(candidates[0].name).to.equal("Alice");
  });

  it("Should allow voting", async function () {
    await voting.connect(addr1).vote(0);
    const candidates = await voting.getAllVotesOfCandidates();
    expect(candidates[0].voteCount).to.equal(1);
  });

  it("Should prevent double voting", async function () {
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("Already voted");
  });
});
