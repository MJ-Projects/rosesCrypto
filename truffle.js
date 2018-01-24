module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost",
      port: 8454,
      network_id: 4,
      gas: 4000000,
      from: 0x8edF467aedc47877486C4055fc484e76AE77fEDF
    }
  }
};
