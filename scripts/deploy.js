async function main() {
    const candidates = ["Alice", "Bob", "Charlie"];
    const votingDuration = 60; // 60 minutes
  
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(candidates, votingDuration);
    await voting.deployed();
  
    console.log("Voting contract deployed to:", voting.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  