module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: 1, // Match any network id
      from: '0xA2a90d735fC6E6752de0CFCC75CC26885936DDc5'
    },

    live: {
      host: "localhost",
      port: 8545,
      network_id: 1,
      gas: 4700000,
      from: '0xA2a90d735fC6E6752de0CFCC75CC26885936DDc5'
    },

    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4,
      gas: 4000000,
      from: 0x8edF467aedc47877486C4055fc484e76AE77fEDF
    }
  },
  solc: { optimizer: { enabled: true, runs: 200 } }
};
