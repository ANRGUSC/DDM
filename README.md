# Decentralized Data Marketplace(DDM)

An architecture for serverless data marketplace using blockchain and other distributed ledger technologies.

It is still under development, we have just released the Version 1.0.

## More Reading
[Current draft of the paper describing the idea](https://github.com/ANRGUSC/DDM/blob/master/documents/ddm.pdf)

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
