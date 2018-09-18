/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import React, { Component } from 'react';
import {Button, Form, Input, InputNumber, Table, Tag } from "antd";
import IOTA from "iota.lib.js";
import {saveAs} from "file-saver";
const FormItem = Form.Item;

class Order extends Component {
    state = {
        seed: '', // string
        quantity: 0, // integer
        orderDetail: {}, // object
        details:[], // array of object

        iconLoading: false,
        display: 'Buy!'
    }


    componentDidMount = ()=>{
        // receive props from the last Component
        const JSON_parse = require('uint8array-json-parser').JSON_parse;
        const obj = JSON_parse(this.props.location.state.item_object);

        this.setState({orderDetail: obj});

    }

    handleClickBtn=()=>{
        this.setState({ iconLoading: true , display: 'Wait...'});
        this.sdppStart();
    }

    sdppStart = () => {
        const quant = this.state.quantity;
        console.log('data type is: ' + this.state.orderDetail.Peripheral_Sensor);
        console.log(typeof this.state.orderDetail.Peripheral_Sensor);

        let data_type = this.state.orderDetail.Peripheral_Sensor;
        const k = 3;
        const data = [];
        const ws = new WebSocket("ws://127.0.0.1:5678/");

        this.send1('Order Placed');

        ws.onopen = () => ws.send(JSON.stringify({
            quantity: quant,
            type: data_type,
        }));

        ws.onmessage =  (event)=> {
            data.push(event.data);
            if (data.length % k === 0) {
                this.send1('Money paid');
            }

            if (data.length === quant) {
                ws.close();
            }
        };

        ws.onclose =  ()=> {
            const blob = new Blob([data.join("\n")], {type: 'text/plain'});
            saveAs(blob, data_type + '.txt');

            if (this.state.details.length  === parseInt(this.state.quantity / 3) + 1) {
                this.setState({
                    iconLoading: false,
                    display: 'Buy Again!'
                });
                console.log(this.state.details);
            }
        }
    };

    send1=(mess)=> {
        const iota = new IOTA({
            'provider': 'http://node02.iotatoken.nl:14265'
        });
        const seed = this.state.seed;
        const depth = 2;
        const minWeightMagnitude = 14;
        const transaction = {
            // TODO: get this address from the seller
            address: 'XKVOPYNOEMGHSMNVHQXZRESW9MORQFWWZF9PYYQXH9DWMGIEJQNCOHGZWMVHDTWJQYLSBLISKYLPPDFIWHFGGDQPHD',
            value: 0,
            message: iota.utils.toTrytes(mess),
            tag: 'SDPPBUYER'
        };
        const transfers = [transaction];
        iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, (error, success) => {
            if (error) {
                console.error("sendTransfer: error", error);
            } else {
                const message = mess + " - " + "https://thetangle.org/bundle/" + success[0]["bundle"].toString();
                console.log(message);
                const obj = {
                    description: mess,
                    url: "https://thetangle.org/bundle/" + success[0]["bundle"].toString()
                };
                const arr = [...this.state.details, obj];
                this.setState({details: arr});
                console.log(this.state.details.length);
                if (this.state.details.length === parseInt(this.state.quantity / 3) + 1) {
                    this.setState({
                        iconLoading: false,
                        display: 'Buy Again!'
                    });
                    console.log(this.state.details);
                }
            }
        });
    };

    handleSeedChange = (e)=>{
        this.setState({
            seed: e.target.value
        })
    }


    handleQuantityChange = (value)=>{
        this.setState({
            quantity: value
        });
    }

    render() {
        console.log('Order Component re-render!')
        const seed = 'seed';
        const quantity = 'quantity';

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 8,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 8,
                },
            },
        };

        // order details
        const columns = [{
            title: 'Seller',
            key: 'Seller',
            dataIndex: 'Seller',
            render: text => <span>{text}</span>,
        }, {
            title: 'Peripheral Sensor',
            key: 'Peripheral_Sensor',
            dataIndex: 'Peripheral_Sensor'
        },{
            title: 'Product Description',
            key: 'Product_Description',
            dataIndex: 'Product_Description'
        },{
            title: 'Price In USD',
            key: 'Price_In_USD',
            dataIndex: 'Price_In_USD'
        }];

        const data = [{
            key: '1',
            Seller: this.state.orderDetail.Seller,
            Peripheral_Sensor: this.state.orderDetail.Peripheral_Sensor,
            Product_Description: this.state.orderDetail.Product_Description,
            Price_In_USD: this.state.orderDetail.Price_per_Data_Unit_USD,
            Max_Data_Unit: this.state.orderDetail.Data_Unit,
        }];

        // transaction details
        const columns1 = [{
            title: 'Data Flow logs',
            key: 'description',
            dataIndex: 'description'
        }, {
            title: 'URL',
            key: 'url',
            dataIndex: 'url',
            render: text => <a href={text}>{text}</a>,
        }];

        const data2 = [{
            key: '1',
            Seller: this.state.orderDetail.Seller,
            Peripheral_Sensor: this.state.orderDetail.Peripheral_Sensor,
            Product_Description: this.state.orderDetail.Product_Description,
            Price_In_USD: this.state.orderDetail.Price_per_Data_Unit_USD,
            Max_Data_Unit: this.state.orderDetail.Data_Unit,
        }];

        const data1 = this.state.details;

        return (
            <div className="orderform">
                <br/><br/>
                <Table columns={columns} dataSource={data} />
                <Form>
                    <br/><br/>

                    <div className="seedform">

                    </div>

            
                    <FormItem className="seedquantity"
                        label={(<span>Seed&nbsp;</span>)}
                        {...formItemLayout}
                    >
                        <Input
                            value={this.state.seed}
                            onChange={this.handleSeedChange}
                        />
                    </FormItem>

                    <FormItem className="seedquantity"
                        label={(<span>Quantity&nbsp;</span>)}
                        {...formItemLayout}
                    >
                        <InputNumber
                            onChange={this.handleQuantityChange}
                            min={1} max={100} defaultValue={1}
                        />
                    </FormItem>
    

                    <FormItem
                        {...tailFormItemLayout}
                    >
                        

                        <Button className="buybutton"
                            type="primary"
                            icon="shopping-cart"
                            loading={this.state.iconLoading}
                            onClick={this.handleClickBtn}
                        >
                            {this.state.display}
                        </Button>
                    </FormItem>

                    <Table className="buytable" columns={columns1} dataSource={this.state.details} />
                </Form>

            </div>
        );
    }
}

export default Order;
