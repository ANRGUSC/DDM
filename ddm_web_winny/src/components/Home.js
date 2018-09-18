import React, { Component } from 'react';
import ddm from '../assets/images/ddm.svg'

class Home extends Component {
    render() {
        return (
        	<div>
 
            <div className="home-description">
                {/*The CCI Decentralized Data Marketplace envisions a world where */}
                {/*application developers can gain access to the myriad of sensors */}
                {/*that others have deployed and connected to the network, and sensor */}
                {/*owners can take the initiative and deploy intelligent sensors in */}
                {/*anticipation of an emerging and independent application market that */}
                {/*will utilize their data for the benefit of its users. The CCI */}
                {/*marketplace, which is hosted on the blockchain, provides support */}
                {/*for the parties to sell, find, and buy data. Streaming Data Payment */}
                {/*Protocol (SDPP) allows a seller and a buyer to easily connect and */}
            	{/*transact with each other using micropayments for streaming data.*/}
            </div>

			<img
                        src={ddm}
                        className="ddm" 
                        alt="ddm"
                    />
            </div>
        );
    }
}

export default Home;