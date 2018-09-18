import Web3 from 'web3';

const HTTP_SERVER = "https://ropsten.infura.io/v3/c178e388bb3e4319a22b97a46332b071";
const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_SERVER));

web3.eth.net.isListening().then(console.log);


export default web3;