import React from 'react';
import logo from '../assets/images/CCI-logo.jpg'

class Header extends React.Component {
    render() {
        return (
            <div className="test">
                <header
                    className="App-header"
                >
                    <img
                        src={logo}
                        className="App-logo" 
                        alt="logo"
                    />

                    <h1
                        className="App-title"
                    >
                         Decentralized Data Marketplace
                    </h1>
                </header>
            </div>

        );
    }
}

export default Header;