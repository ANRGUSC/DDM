const express = require('express');
const bs58 = require('bs58');
const Web3 = require('web3');
const router = express.Router();

router.get('/decode' , function(req , res) {
  let body = getHexfromIPFSHash('QmWbr2USQwEdVqsf4NmZQffWqTLksfkacBfHXriEBnMppJ');
  console.log(body);
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  web3.eth.defaultAccount = '0x8b0b588897b1d364b7d07fc9cca4b436f8d3621f';
  console.log(web3.isConnected());
  var IPFSContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hash_start",
				"type": "bytes32"
			},
			{
				"name": "_hash_end",
				"type": "bytes32"
			},
			{
				"name": "_pytpe",
				"type": "bytes1"
			}
		],
		"name": "postProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hash",
				"type": "bytes32"
			},
			{
				"name": "_hashfunction",
				"type": "uint8"
			},
			{
				"name": "_size",
				"type": "uint8"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getProducts",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "indexed_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "hash_start",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "hash_end",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ptype",
				"type": "bytes1"
			}
		],
		"name": "PostProducts",
		"type": "event"
	}
]);
var IPFS = IPFSContract.at('0x5e85db2fb14874fbfe8dc617e4548da879ca851c');
IPFS.postProduct(body.hash_start , body.hash_end , body.protocol_type);
});

function bytes32fromIPFSHash(ipfsHash) {
  return {
    hash : `0x${ipfsHash.slice(2).toString('hex')}`,
    hashFunction : ipfsHash[0],
    size: ipfsHash[1]
  };
}

function getHexfromIPFSHash(ipfsHash) {
  let hash = Buffer.from(ipfsHash).toString('hex');
  return {
    hash_start:`0x${hash.substring(0,64)}`,
    hash_end: `0x${hash.slice(64)}`,
    protocol_type: '0x01'
  }
}

module.exports = router;
