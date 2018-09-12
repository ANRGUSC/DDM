import React from 'react';
import logo from '../assets/images/logo.svg'

class Header extends React.Component {
    render() {
        return (
            <div>
                <header
                    className="App-header"
                >
                    <img
                        src={logo}
                        className="App-logo" alt="logo"
                    />
                    <h1
                        className="App-title"
                    >
                        CCI Decentralized Data Marketplace
                    </h1>
                </header>
            </div>

        );
    }
}

export default Header;