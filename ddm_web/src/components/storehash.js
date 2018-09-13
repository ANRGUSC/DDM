import web3 from './web3';
//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x4EEa0CD3fed917F5D281a325C5AA6Ce386D68BaB';
//use the ABI from your contract
const abi = [
    {"constant":false,"inputs":[{"name":"_hash_start","type":"bytes32"},{"name":"_hash_end","type":"bytes32"},{"name":"_pytpe","type":"bytes1"}],"name":"postProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"},{"name":"_hashfunction","type":"uint8"},{"name":"_size","type":"uint8"}],"name":"addProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indexed_from","type":"address"},{"indexed":false,"name":"hash_start","type":"bytes32"},{"indexed":false,"name":"hash_end","type":"bytes32"},{"indexed":false,"name":"ptype","type":"bytes1"}],"name":"PostProducts","type":"event"}
]
export default new web3.eth.Contract(abi, address);