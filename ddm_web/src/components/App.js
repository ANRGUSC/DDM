/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Header from "./Header";
import Main from "./Main";
import NavBar from "./NavBar";

const {Sider, Content} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        className='navBar'
                    >
                        <NavBar />
                    </Sider>
                    <Layout>
                        <Header />
                        <Content style={{ margin: '0 16px' }}>
                            <Main />
                        </Content>
                    </Layout>
                </Layout>
            </div>

        )
    }
}

export default App;