require("@nomicfoundation/hardhat-ethers");
require('@nomicfoundation/hardhat-toolbox');
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const { RPC_URL, PRIVATE_KEY, LINEASCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.8.24",
  networks: {
    LineaSepolia: {
      url: process.env.RPC_URL,
      chainId: 59141,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 60000,
      confirmations: 2
    },
  },

  sourcify: {
    enabled: false
  }, 

  etherscan: {
    apiKey: {
      linea_sepolia: LINEASCAN_API_KEY
    },
    customChains: [
      {
        network: "linea_sepolia",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/address"
        }
      }
    ]
  }  
};