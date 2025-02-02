require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Загружаем переменные из .env

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY]
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // Исправлено
      accounts: [process.env.PRIVATE_KEY]
    },
    holesky: {
      url: `https://holesky.infura.io/v3/${process.env.INFURA_API_KEY}`, // Исправлено
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
