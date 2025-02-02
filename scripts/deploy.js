const { ethers } = require("hardhat");

async function main() {
    const initialSupply = ethers.utils.parseUnits("2000", 18); // 2000 токенов с 18 знаками

    console.log("Deploying AITUSE2316 Token...");
    const AITUSE2316 = await ethers.getContractFactory("AITUSE2316");
    const aituse2316 = await AITUSE2316.deploy(initialSupply);

    await aituse2316.deployed();

    console.log(`AITUSE2316 deployed to: ${aituse2316.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
