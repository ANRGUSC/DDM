# Decentralized Data Marketplace (DDM)

This is an implementation of a decentralized data marketplace using blockchain and other distributed ledger technologies.

There are two sets of parties that would use DDM - sellers and buyers. Sellers use DDM to post descriptions of data products using IPFS and an Ethereum smart contracts, which buyers can search and browse to find data of interest to them. In the current implementation, the buyer can then use SDPP (Streaming data payment protocol) to connect to an data server hosted by the seller to get and pay for streaming data, useful for IoT applications. Currently SDPP (and hence DDM) supports payment for data using the IOTA cryptocurrency, though this could be extended to other cryptocurrencies. In principle the seller data registry could also be implemented using alternatives to IPFS and Ethereum. The following picture illustrates shows how DDM works: 

![DDM architecture illustration](https://raw.githubusercontent.com/ANRGUSC/DDM/master/documents/DDM_architecture.png?token=ATzSjrIar8iUxdPSGEvcGN4Gghhg_nLyks5bqpLZwA%3D%3D)

This is version 1.0, DDM is still under development. The current prototype does not implement ratings, curated recommendations, or sophisticated search mechanisms, these are left to future versions.

## Video Demo
A [video demo of DDM](https://www.youtube.com/watch?v=W2hnUdX-yDk?cc_load_policy=1)

## More Reading
* Gowri S. Ramachandran, Rahul Radhakrishnan, Bhaskar Krishnamachari, “[Towards a Decentralized Data Marketplace for Smart Cities](https://github.com/ANRGUSC/DDM/blob/master/documents/ddm.pdf),” Invited paper at The 1st International Workshop on BLockchain Enabled Sustainable Smart Cities (BLESS 2018), Kansas City, MO, USA, Sept. 19, 2018, held in conjunction with the 4th IEEE Annual International Smart Cities Conference (ISC2 2018).  
* [Presentation slides in pdf.](https://github.com/ANRGUSC/DDM/blob/master/documents/ddm_slides.pdf)

## Requirements
* Python (>=3.4)
    * [websockets](https://websockets.readthedocs.io/en/stable/intro.html)
    * [pyota](https://github.com/iotaledger/iota.lib.py)
* NPM
    * [web3](https://github.com/ethereum/web3.js/)
    * [iota](https://github.com/iotaledger/iota.js)
    * [file-saver](https://www.npmjs.com/package/file-saver)
* Install metamask browser extension

## Instructions
- git clone https://github.com/ANRGUSC/DDM.git
- cd DDM/
- cd sdpp_seller/
- python3 seller_websockets.py
- cd ../ddm_web
- npm install
- npm start
- Open localhost:3000/ in your browser and enjoy! 

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## License
Copyright (c) 2018, Autonomous Networks Research Group, USC. See [this](https://github.com/ANRGUSC/DDM/blob/master/LICENSE.txt) file for more details.
