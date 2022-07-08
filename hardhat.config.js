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
       accounts: ["0x2caf42750094f366a1a99467a05fee28ce498c30c8a3d57e000de04bde2bcd37"]
     },
    // polygon: {
    //   url: "https://polygon-mumbai.infura.io/v3/a55d24261c534a599245e3eb82e6ad0b",
    //   accounts: [process.env.pk]
    // }
  }
};