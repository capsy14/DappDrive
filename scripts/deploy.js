const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();
  await upload.waitForDeployment();
  console.log("Contract Address is",upload.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0