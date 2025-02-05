require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");


module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
