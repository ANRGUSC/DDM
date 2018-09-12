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