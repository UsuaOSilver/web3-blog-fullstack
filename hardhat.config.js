require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity:"0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
     mumbai: {
       url: "https://polygon-mumbai.infura.io/v3/a55d24261c534a599245e3eb82e6ad0b",
       accounts: [`${process.env.PRIVATE_KEY}`]
     },
    // polygon: {
    //   url: "https://polygon-mumbai.infura.io/v3/a55d24261c534a599245e3eb82e6ad0b",
    //   accounts: [process.env.pk]
    // }
  }
};