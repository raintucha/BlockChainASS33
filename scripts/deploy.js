const { ethers } = require("hardhat");

async function main() {
  // Вычисляем начальный запас: 2000 токенов с 18 десятичными знаками
  const initialSupply = ethers.parseUnits("2000", 18);

  console.log("Deploying AITUSE2316 Token...");
  const AITUSE2316 = await ethers.getContractFactory("AITUSE2316");
  const aituse2316 = await AITUSE2316.deploy(initialSupply);

  // Ожидаем завершения деплоя (в ethers v6 используется waitForDeployment)
  await aituse2316.waitForDeployment();

  // В ethers v6 адрес контракта находится в свойстве target
  console.log(`AITUSE2316 deployed to: ${aituse2316.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
