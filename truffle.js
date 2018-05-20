// Allows us to use ES6 in our migrations and tests.
require('babel-register')

//const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    }
    // rinkeby: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       process.env.rinkeby_mnemonic,
    //       process.env.rinkeby_url
    //     )
    //   },
    //   network_id: 4
    // }
  }
};