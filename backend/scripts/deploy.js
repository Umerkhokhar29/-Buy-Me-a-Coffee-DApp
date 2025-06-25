const hre = require("hardhat");

async function main() {
  const Coffee = await hre.ethers.getContractFactory("Coffee");
  const coffee = await Coffee.deploy();
  await coffee.waitForDeployment();

  console.log(`✅ Coffee contract deployed to: ${coffee.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
