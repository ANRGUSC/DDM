import React, { Component } from 'react';
import {Button, Form, Input, InputNumber} from "antd";
import IOTA from "iota.lib.js";
import {saveAs} from "file-saver";

const FormItem = Form.Item;

class Order extends Component {
    state = {
        seed: '',
        quantity: 0,
        orderDetail: {},
        details:[],

        iconLoading: false,
        display: 'Buy!'
    };

    componentDidMount = ()=>{
        // receive props from the last Component
        const JSON_parse = require('uint8array-json-parser').JSON_parse;
        const obj = JSON_parse(this.props.location.state.item_object);
        console.log(obj);
        this.setState({orderDetail: obj});
    }

    // 'Buy!' button
    handleClickBtn=()=>{
        this.setState({ iconLoading: true , display: 'Wait...'});
        this.sdppStart();
    }

    sdppStart = () => {
        // get from ethereum
        //const quant = 7;
        const quant = this.state.quantity;
        console.log('quantity is ' + quant);

        const data_type = "gas";
        const k = 3;
        const data = [];
        const ws = new WebSocket("ws://127.0.0.1:5678/");

        this.sendTransaction('Order Placed');

        ws.onopen = () => ws.send(JSON.stringify({
            quantity: quant,
            type: data_type,
        }));

        ws.onmessage =  (event)=> {
            data.push(event.data);
            //console.log(data);
            if (data.length % k === 0) {
                //do IOTA operation
                this.sendTransaction('Money paid');
            }

            if (data.length === quant) {
                ws.close();
            }
        };

        ws.onclose =  ()=> {
            const blob = new Blob([data.join("\n")], {type: 'text/plain'});
            const message = "Please check " + data_type + ".txt" + " in your downloads folder!";
            console.log(message);
            saveAs(blob, data_type + '.txt');

            const arr = [...this.state.details, message];
            this.setState({details: arr});
            console.log(this.state.details.length);
            if (this.state.details.length % 4 === 0) {
                this.setState({
                    iconLoading: false,
                    display: 'Buy Again!'
                });
                console.log(this.state.details);
            }
        }
    };

    sendTransaction=(mess)=> {
        const iota = new IOTA({
            'provider': 'http://node02.iotatoken.nl:14265'
        });
        // get this input from an input text box
        const seed = this.state.seed;
        console.log("Seed value, " + seed);

        //const seed = 'RAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHUL9RAHUL';

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

                const arr = [...this.state.details, message];
                this.setState({details: arr});
                console.log(this.state.details.length);
                if (this.state.details.length % 4=== 0) {
                    this.setState({
                        iconLoading: false,
                        display: 'Buy Again!'
                    });
                    console.log(this.state.details);
                }
            }
        });
    }

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
                sm: {span: 16},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>

                <Form>
                    <br/><br/>
                    <FormItem
                    >
                        <div>
                            Product_Type: {this.state.orderDetail.Product_Type},
                        </div>
                        <div>
                            Peripheral_Sensor: {this.state.orderDetail.Peripheral_Sensor},
                        </div>
                        <div>
                            Product_Description: {this.state.orderDetail.Product_Description},
                        </div>
                        <div>
                            Longitude: {this.state.orderDetail.Longitude},
                        </div>
                        <div>
                            Latitude: {this.state.orderDetail.Latitude},
                        </div>
                        <div>
                            Price_per_Data_Unit_USD: {this.state.orderDetail.Price_per_Data_Unit_USD},
                        </div>
                        <div>
                            Data_Unit: {this.state.orderDetail.Data_Unit},
                        </div>
                        <div>
                            IP_Address: {this.state.orderDetail.IP_Address},
                        </div>
                        <div>
                            Public_Address: {this.state.orderDetail.Public_Address},
                        </div>
                        <div>
                            Seller_Credentials: {this.state.orderDetail.Seller_Credentials}
                        </div>
                    </FormItem>
                    <FormItem
                        label={(<span>Seed&nbsp;</span>)}
                        {...formItemLayout}
                    >
                        <Input
                            value={this.state.seed}
                            onChange={this.handleSeedChange}
                        />
                    </FormItem>
                    <FormItem
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
                        <Button type="primary"
                                icon="shopping-cart"
                                loading={this.state.iconLoading}
                                onClick={this.handleClickBtn}
                        >
                            {this.state.display}
                        </Button>
                    </FormItem>
                    <ul>
                        {this.state.details.map((item, index)=>{
                            return (
                                <div>
                                    {item}
                                </div>
                            )
                        })}
                    </ul>
                </Form>

            </div>
        );
    }
}

export default Order;
