const { ethers } = require("hardhat");
const readline = require("readline");

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (answer) => {
    rl.close();
    resolve(answer);
  }));
}

async function main() {
  // Ввод параметров вручную
  const initialSupplyInput = await askQuestion("Введите начальный запас токенов (например, 2000): ");
  const initialSupply = ethers.parseUnits(initialSupplyInput, 18);

  const ownerAddress = await askQuestion("Введите адрес владельца: ");

  console.log("Deploying AITUSE2316 Token with user input...");

  const AITUSE2316 = await ethers.getContractFactory("AITUSE2316");

  // Деплой контракта
  const aituse2316 = await AITUSE2316.deploy(initialSupply, { from: ownerAddress });

  // Ожидаем завершения деплоя
  await aituse2316.waitForDeployment();

  console.log(`AITUSE2316 deployed to: ${aituse2316.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
