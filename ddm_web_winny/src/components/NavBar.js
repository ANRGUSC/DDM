import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <div>
                <Menu
                    // theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="vertical-left"
                >
                    
                    <Menu.Item key="1"  className="menu-button">
                        <Icon type="home" />
                        <span>Home</span>
                        <Link to ='/' />
                    </Menu.Item>
                    
                    <Menu.Item key="2" className="menu-button">
                        <Icon type="login" />
                        <span>Register Product</span>
                        <Link to ='/register' />
                    </Menu.Item>

                    <Menu.Item key="3" className="menu-button">
                        <Icon type="search" />
                        <span>Search</span>
                        <Link to ='/search' />
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default NavBar;
