/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import React, { Component } from 'react';


class TodoItem extends Component {

    render() {
        return (
            <div onClick={this.handleClick}>
                {this.props.content}
            </div>
        );
    }
    handleClick= () => {
        this.props.deleteItem(this.props.index)
    }

}

export default TodoItem;
