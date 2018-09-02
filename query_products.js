let Web3 = require('web3');
const hex2ascii = require('hex2ascii')


// Connect to Infura Ropsten Endpoint
const HTTP_SERVER = "https://ropsten.infura.io/v3/c178e388bb3e4319a22b97a46332b071";
const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_SERVER));

// Configure account from private key
const account = web3.eth.accounts.privateKeyToAccount('0xC89ADA337DCDD9D9D092D582104064554DDC3A835B0D164B82E304F0DFC5F0FC');
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
//console.log("Using account:", web3.eth.defaultAccount);

//invoke ipfs
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) //connect to the local daemon

// Specify contract ABI and address
const contractABI = [{"constant":false,"inputs":[{"name":"_hash_start","type":"bytes32"},{"name":"_hash_end","type":"bytes32"},{"name":"_ptype","type":"bytes1"}],"name":"publishMetaData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_hash_start","type":"bytes32"},{"indexed":false,"name":"_hash_end","type":"bytes32"},{"indexed":false,"name":"_ptype","type":"bytes1"}],"name":"Publish","type":"event"}];
const contractAddress = "0x2d57808D1501a5fB3Ba6ECcA41468d24C0fEe41f";
var publishMetaData = new web3.eth.Contract(contractABI, contractAddress);

// Use this standard fix
if (typeof publishMetaData.currentProvider.sendAsync !== "function") {
    publishMetaData.currentProvider.sendAsync = function() {
        return publishMetaData.currentProvider.send.apply(
            publishMetaData.currentProvider, arguments
        );
    };
}

// Get past events of type "Publish" from block 0 (genesis) to latest block.
publishMetaData.getPastEvents("Publish", { fromBlock: 0, toBlock: 'latest' }).then(
    function(events) {
        //console.log(events);
        events.forEach(function(product){
            product_data = product.returnValues
            //console.log(product_data["_hash_start"]);
            ipfs_pointer=hex2ascii(product_data["_hash_start"])+hex2ascii(product_data["_hash_end"])
            //console.log(ipfs_pointer)
            ipfs.files.get(ipfs_pointer, function (err, files) {files.forEach((file) => {
              console.log("---------------Data Product---------------------")
              product_description = file.content.toString('utf8')
              console.log(product_description)
              console.log("------------------------------------------------")
            }
          )})

        });
    }
);
