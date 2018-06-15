const path = require('path');

module.exports = {
  contracts_build_directory: path.join(__dirname, './src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      network_id: 4,
      host: '127.0.0.1',
      port: 8545
    }
  }
};
