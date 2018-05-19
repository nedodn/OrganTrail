// Allows us to use ES6 in our migrations and tests.
require('babel-register')

// var HDWalletProvider = require('truffle-hdwallet-provider')
// var mnemonic = ''

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/mXHEyD5OI3wXAnDE6uT4')
      },
      network_id: 4,
    } 
  }
};