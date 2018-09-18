/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import React, { Component } from 'react';
import { Radio} from 'antd';

class Item extends Component {
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        console.log('render item');
        return (
            <div>
                <Radio value={this.props.index} style={radioStyle}>
                    {this.props.content}
                </Radio>
            </div>
        );
    }
}

export default Item;