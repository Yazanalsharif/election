const path = require("path");


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host:"127.0.0.1",
      port: 7545,
      network_id: "5777"
    }
  },
  compilers:{
    solc:{
      version:"0.6.10"
    }
  }
};
//web3.eth.sendTransaction({from:"0x84F084c2eD669276F43dBD13110A71e5E3aC3241", to:"0x3d5eA0305dc7ed9F8557C85B64aB63A181F1f9cA", value:web3.utils.toWei(1, "ether")});
